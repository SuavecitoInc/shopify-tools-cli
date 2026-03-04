import path from 'path';
import csv from 'csvtojson';
import config from '../config/shopify';
import {
  defaultImportName,
  defaultErrorName,
  defaultStore,
} from '../config/defaults';
import {
  validateStore,
  printConfig,
  initializeCSV,
  writeCSVRow,
  searchBySKU,
  updateShopifyProductVariant,
} from '../lib';

const DEBUG = false;
const DIVIDER = '-------------------------------';

// defaults
let csvFileToImport: string = defaultImportName;
let errorFileName: string = defaultErrorName;
let store: string = defaultStore;

type VariantToUpdate = {
  id: string;
  price?: string;
  compareAtPrice?: string | null;
  metafields?: {
    namespace: string;
    key: string;
    type: string;
    value: string;
  }[];
};

const productsObj: {
  [key: string]: {
    productId: string;
    variants: VariantToUpdate[];
  };
} = {};

export const updatePrices = async (argv: any) => {
  // print args
  if (argv.import) {
    csvFileToImport = argv.import;
  }

  if (argv.export) {
    errorFileName = argv.export;
  }

  store = argv.store;

  printConfig(store, csvFileToImport, errorFileName);

  const date = new Date();

  const errorCsvWriter = initializeCSV(
    `${store}_${errorFileName}_errors-${date.toISOString()}`,
    [
      { id: 'Internal ID', title: 'Internal ID' },
      { id: 'SKU', title: 'SKU' },
      { id: 'NewPrice', title: 'NewPrice' },
      { id: 'NewCompareAtPrice', title: 'NewCompareAtPrice' },
      { id: 'Error', title: 'Error' },
    ]
  );

  const bulkUpdateErrorsCsvWriter = initializeCSV(
    `${store}_bulk-update-prices_errors-${date.toISOString()}`,
    [
      { id: 'Product ID', title: 'Product ID' },
      { id: 'Variants', title: 'Variants' },
    ]
  );

  if (validateStore(store)) {
    const jsonArray = await csv().fromFile(
      path.join(__dirname, `../../csv/${csvFileToImport}.csv`)
    );
    console.log('READING CSV & CONVERTING TO JSON');
    console.log('THERE ARE', jsonArray.length, 'ROWS IN THE CSV');

    console.log(DIVIDER);
    console.log('STARTING TO PROCESS EACH ROW...');

    // create payload for all products/variants to update
    for (const row of jsonArray) {
      const sku = row.SKU;
      const price = row.NewPrice;
      const comparePrice =
        row.NewCompareAtPrice !== '' ? row.NewCompareAtPrice : '0';
      const wholesaleStores = ['wholesale', 'staging_wholesale'];
      const newRetailPrice =
        wholesaleStores.includes(store) && row.NewRetailPrice
          ? row.NewRetailPrice
          : null;

      const result = await createPayload(
        store,
        sku,
        price,
        comparePrice,
        newRetailPrice
      );

      if (result) {
        const { productId, variant } = result;
        if (!productsObj[productId]) {
          productsObj[productId] = {
            productId,
            variants: [variant],
          };
        } else {
          productsObj[productId].variants.push(variant);
        }
        console.log(
          'PAYLOAD CREATED FOR SKU',
          sku,
          'ADDING TO BULK UPDATE OBJ'
        );
      } else {
        console.log(
          'PRODUCT / VARIANT NOT FOUND, CHECK SCRIPT LOG FOR DETAILS.'
        );
        row.Error = 'Product / Variant not found';
        await writeCSVRow(errorCsvWriter, row);
      }
      console.log(DIVIDER);
    }

    console.log(DIVIDER);
    console.log('DONE GETTING PRODUCTS...');

    // create an array from the productsObj to update in bulk
    const productsToUpdate = Object.values(productsObj);
    console.log('PRODUCTS TO UPDATE', productsToUpdate.length);

    for (const product of productsToUpdate) {
      try {
        // create variants
        const variants: VariantToUpdate[] = [];
        for (const variant of product.variants) {
          const v: VariantToUpdate = {
            id: variant.id,
          };

          if (variant?.price) {
            v.price = variant.price;
          }

          if (variant?.compareAtPrice) {
            v.compareAtPrice =
              variant.compareAtPrice === '0' ? null : variant.compareAtPrice;
          }

          if (variant?.metafields) {
            v.metafields = variant.metafields;
          }

          DEBUG && console.log('VARIANT TO UPDATE', JSON.stringify(v, null, 2));

          variants.push(v);
        }

        const variables = {
          productId: product.productId,
          variants: variants,
        };

        console.log(
          'UPDATING PRODUCT',
          product.productId,
          'WITH VARIANTS',
          variants.length
        );

        DEBUG && console.log(JSON.stringify(variables, null, 2));

        await updateShopifyProductVariant(store, variables);
      } catch (err: any) {
        console.log('ERROR OCCURRED, CHECK EMAIL OR SCRIPT LOG FOR DETAILS.');
        console.log(err.message);
        await writeCSVRow(bulkUpdateErrorsCsvWriter, {
          'Product ID': product.productId,
          Variants: JSON.stringify(product.variants),
        });
      }
    }
  } else {
    console.log(
      `Invalid value for store: ${store}, please use ${Object.keys(config).join(
        ', '
      )} only.`
    );
  }
};

const createPayload = async (
  store: string,
  sku: string,
  price: string,
  comparePrice: string,
  newRetailPrice?: string | null // wholesale stores have a retail price metafield that can be updated when updating price
) => {
  try {
    console.log('-------------------------------');
    console.log('SEARCHING FOR SKU:' + sku);
    const searchResult = await searchBySKU(store, sku);

    if (!searchResult) {
      // doesn't exist - create'
      console.log('PRODUCT DOES NOT EXIST!');
      return false;
    } else {
      // exists - update
      const { product, variant } = searchResult;

      const payload = {
        productId: product.id,
        variant: {
          id: variant.id,
          price,
          compareAtPrice: comparePrice,
          // conditionally add metafield for retail price if it's a wholesale store and a new retail price is provided
          ...(newRetailPrice && {
            metafields: [
              {
                namespace: 'suavecito',
                key: 'retail_price',
                type: 'money',
                value: JSON.stringify({
                  amount: newRetailPrice,
                  currency_code: 'USD',
                }),
              },
            ],
          }),
        },
      };

      return payload;
    }
  } catch (err: any) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

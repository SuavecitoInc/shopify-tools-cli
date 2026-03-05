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
  removeShopifyProductTags,
  printConfig,
  initializeCSV,
  writeCSVRow,
  searchBySKU,
} from '../lib';
import type { Row } from '../lib/types';

const DEBUG = false;
const DIVIDER = '-------------------------------';

type ProductToUpdate = {
  productId: string;
  tagsToRemove: string[];
};

// defaults
let csvFileToImport: string = defaultImportName;
let errorFileName: string = defaultErrorName;
let store: string = defaultStore;

export const removeTags = async (argv: any) => {
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
  const filename = `${errorFileName}-${date.toISOString()}`;
  const csvWriter = initializeCSV(filename, [
    { id: 'Product ID', title: 'Product ID' },
    { id: 'Tags', title: 'Tags' },
    { id: 'Error', title: 'Error' },
  ]);

  const productsToUpdateObj: {
    [key: string]: ProductToUpdate;
  } = {};

  if (validateStore(store)) {
    const jsonArray = await csv().fromFile(
      path.join(__dirname, `../../csv/${csvFileToImport}.csv`)
    );
    console.log('READING CSV & CONVERTING TO JSON');
    console.log('THERE ARE', jsonArray.length, 'ROWS IN THE CSV');

    console.log(DIVIDER);
    console.log('STARTING TO PROCESS EACH ROW...');

    // given the variant SKU, find the product to add the tags to
    for (const row of jsonArray as Row[]) {
      const sku = row.SKU;
      let tags: string[];
      if (row.Tags) {
        tags = row.Tags.split(',').map(tag => tag.trim());
      } else if (argv.tags) {
        tags = (argv.tags as string).split(',').map(tag => tag.trim());
      } else {
        console.log('ERROR: no tags found.');
        continue;
      }

      console.log('-------------------------------');
      console.log('SEARCHING FOR SKU:' + sku);
      const searchResult = await searchBySKU(store, sku);

      if (!searchResult) {
        // doesn't exist - create'
        console.log('PRODUCT DOES NOT EXIST!');
        row.Error = 'Product not found';
        await writeCSVRow(csvWriter, row);
      } else {
        // exists - update
        const { product, variant } = searchResult;
        const productId = product.id;
        if (!productsToUpdateObj[productId]) {
          productsToUpdateObj[productId] = {
            productId,
            tagsToRemove: tags,
          };
        } else {
          // check if the tags we're adding already exist in the tagsToRemove array for this product, if not add them
          const existingTags = productsToUpdateObj[productId].tagsToRemove;
          tags.forEach(tag => {
            if (!existingTags.includes(tag)) {
              existingTags.push(tag);
            }
          });
        }
        console.log('PRODUCT FOUND FOR SKU:', sku, 'QUEUING FOR UPDATE');
      }
      console.log(DIVIDER);
    }

    // create an array from the productsToUpdate object to update the products
    const productsToUpdate = Object.values(productsToUpdateObj);
    console.log('PRODUCTS TO UPDATE', productsToUpdate.length);

    for (const product of productsToUpdate) {
      // update the product with the new tags
      const { productId, tagsToRemove } = product;
      try {
        console.log(
          'REMOVING TAGS FOR PRODUCT ID',
          productId,
          'TAGS:',
          tagsToRemove
        );
        const result = await removeShopifyProductTags(
          store,
          productId,
          tagsToRemove
        );
        if (result) {
          console.log('TAGS REMOVED FOR PRODUCT ID', product.productId);
        } else {
          console.log('ERROR REMOVING TAGS FOR PRODUCT ID', product.productId);
          await writeCSVRow(csvWriter, {
            'Product ID': product.productId,
            Tags: tagsToRemove.join(', '),
            Error: 'Unknown error removing tags',
          });
        }
      } catch (err: any) {
        console.log('ERROR REMOVING TAGS FOR PRODUCT ID', product.productId);
        console.log(err.message);
        await writeCSVRow(csvWriter, {
          'Product ID': product.productId,
          Tags: tagsToRemove.join(', '),
          Error: err.message,
        });
      }
      console.log(DIVIDER);
    }
  } else {
    console.log(
      `Invalid value for store: ${store}, please use ${Object.keys(config).join(
        ', '
      )} only.`
    );
  }
};

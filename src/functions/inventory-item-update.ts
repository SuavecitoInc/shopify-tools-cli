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
  addShopifyProductTags,
  printConfig,
  initializeCSV,
  writeRecords,
  writeCSVRow,
  searchBySKU,
  searchForInventoryItemBySKU,
  updateInventoryItem,
} from '../lib';
import type { Row } from '../lib/types';

const DEBUG = false;
const DIVIDER = '-------------------------------';

/*

Categories Done:
- Hair Cream
- Hair Gel
- Hair Spray
- Mustache Wax
- Oil Based Pomade
- Pomade
*/

const HS_MAP = {
  Aftershave: '2106.90.99',
  Apparel: '6109.10.0000',
  'Beard Balm': '3305.90.0000',
  'Beard Oil': '3305.90.0000',
  Brilliantine: '3403.19.9000',
  Brush: '3403.19.9000',
  Comb: '9603.21.0000',
  Combs: '9603.21.0000',
  'Hair Cream': '3305.90.0000',
  'Hair Gel': '3305.90.0000',
  'Hair Spray': '3305.90.0000',
  'Hair Styling': '3305.90.0000',
  'Health & Beauty': '3305.90.0000',
  Merchandise: '6109.10.0000',
  'Mustache Wax': '3305.90.0000',
  'Oil Based Pomade': '3305.90.0000',
  Pomade: '3305.90.0000',
  'Pomade Shampoo': '3305.90.0000',
  Razor: '8211.91.0000',
  'Razor Blade': '8211.91.0000',
  'Razor Stand': '8211.91.0000',
  'Shampoos & Conditioners': '3305.90.0000',
  'Shave Bowl': '6912.00.0000',
  'Shave Brush': '9603.21.0000',
  'Shave Cream': '3401.11.0000',
  'Shave Oil': '3401.11.0000',
  'Shave Soap': '3401.11.0000',
  Soap: '3401.11.0000',
  'Tattoo Balm': '3305.90.0000',
  'Toiletry Bag': '4202.92.1500',
  Toothpaste: '3306.10.0000',
  'Water Based Pomade': '3305.90.0000',
  'Default Product': '6109.10.0000',
  UNKNOWN: 'UNKNOWN',
};

// defaults
let csvFileToImport: string = defaultImportName;
let errorFileName: string = defaultErrorName;
let store: string = defaultStore;

export const inventoryItemUpdate = async (argv: any) => {
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
    { id: 'SKU', title: 'SKU' },
    { id: 'Variant ID', title: 'Variant ID' },
    { id: 'Error', title: 'Error' },
  ]);

  const itemsToUpdateObj: {
    sku: string;
    productType: string;
    variantId: string;
    inventoryItemId: string;
  }[] = [];

  if (validateStore(store)) {
    const jsonArray = await csv().fromFile(
      path.join(__dirname, `../../csv/${csvFileToImport}.csv`)
    );
    console.log('READING CSV & CONVERTING TO JSON');
    console.log('THERE ARE', jsonArray.length, 'ROWS IN THE CSV');

    console.log(DIVIDER);
    console.log('STARTING TO PROCESS EACH ROW...');

    // given the variant SKU, find the inventory item to update
    for (const row of jsonArray as Row[]) {
      const sku = row.SKU;

      console.log('SEARCHING FOR SKU:' + sku);
      const searchResult = await searchForInventoryItemBySKU(store, sku);

      if (!searchResult) {
        // doesn't exist - create'
        console.log('VARIANT DOES NOT EXIST!');
        row.Error = 'Variant not found';
        await writeCSVRow(csvWriter, {
          SKU: sku,
          'Variant ID': '',
          Error: 'Variant not found',
        });
      } else {
        // exists - update
        const { variant } = searchResult;
        const variantId = variant.id;
        itemsToUpdateObj.push({
          sku,
          productType: searchResult.product.productType,
          variantId,
          inventoryItemId: variant.inventoryItem.id,
        });
        console.log('VARIANT FOUND FOR SKU:', sku, 'QUEUING FOR UPDATE');
      }
      console.log(DIVIDER);
    }

    console.log(DIVIDER);
    console.log(
      'FINISHED PROCESSING CSV, THERE ARE',
      itemsToUpdateObj.length,
      'ITEMS TO UPDATE'
    );
    console.log(DIVIDER);

    const numOfItemsToUpdate = itemsToUpdateObj.length;
    let currentItemIndex = 1;

    for (const {
      sku,
      productType,
      variantId,
      inventoryItemId,
    } of itemsToUpdateObj) {
      // get the inventory item to update
      try {
        console.log(
          `UPDATING INVENTORY ITEM ${currentItemIndex} OF ${numOfItemsToUpdate} FOR SKU: ${sku}`
        );
        const hsCode = HS_MAP[productType] || false;
        if (!hsCode) {
          console.log(
            'NO HS CODE FOUND FOR PRODUCT TYPE:',
            productType,
            'USING DEFAULT HS CODE FOR VARIANT ID:',
            variantId
          );
          await writeCSVRow(csvWriter, {
            SKU: sku,
            'Variant ID': variantId,
            Error: 'No HS code found for product type, using default HS code',
          });
        }

        console.log('USING HS CODE:', hsCode, 'FOR VARIANT ID:', variantId);

        const result = await updateInventoryItem(store, {
          id: inventoryItemId,
          input: {
            harmonizedSystemCode: hsCode,
            countryCodeOfOrigin: 'US',
          },
        });
        if (result) {
          console.log(
            'INVENTORY ITEM UPDATED FOR VARIANT ID:',
            variantId,
            'HS CODE:',
            hsCode
          );
        } else {
          console.log(
            'ERROR UPDATING INVENTORY ITEM FOR VARIANT ID:',
            variantId
          );
          await writeCSVRow(csvWriter, {
            SKU: sku,
            'Variant ID': variantId,
            Error: 'Unknown error Updating Inventory Item',
          });
        }
      } catch (err: any) {
        console.log('ERROR UPDATING INVENTORY ITEM FOR VARIANT ID:', variantId);
        console.log(err.message);
        await writeCSVRow(csvWriter, {
          SKU: sku,
          'Variant ID': variantId,
          Error: err.message,
        });
      }
      console.log(DIVIDER);
      currentItemIndex++;
    }
  } else {
    console.log(
      `Invalid value for store: ${store}, please use ${Object.keys(config).join(
        ', '
      )} only.`
    );
  }
};

import { fetchAdmin } from '../utils';
import { searchBySKUQuery, inventoryItemUpdate } from '../schema/admin';
import type {
  SearchBySkuQuery,
  InventoryItemUpdateMutation,
} from '../types/admin.generated';

export const searchForInventoryItemBySKU = async (
  store: string,
  sku: string
) => {
  const variables = {
    filter: `sku:${sku}`,
  };

  try {
    const searchResult = await fetchAdmin<SearchBySkuQuery>(
      store,
      searchBySKUQuery,
      variables
    );

    if (searchResult?.errors && searchResult.errors.length > 0) {
      throw new Error(searchResult.errors[0].message);
    }

    if (!searchResult?.data?.products) {
      throw new Error('Product not found');
    }

    // loop through products
    const products = searchResult.data.products.edges;
    let productID: string | null = null;
    let productType: string | null = null;
    let variantID: string | null = null;
    let inventoryItemID: string | null = null;
    console.log(`FOUND ${products.length} POSSIBLE PRODUCTS`);
    console.log('MATCHING SKU TO PRODUCT VARIANT');
    products.forEach(product => {
      if (productID) return;
      console.log('MATCHING SKU TO PRODUCT VARIANT');

      const variants = product.node.variants.edges;
      const found = variants.find(function (variant) {
        return variant.node.sku === sku;
      });
      if (found) {
        console.log('FOUND SHOPIFY PRODUCT', product.node.id);
        console.log('FOUND VARIANT', found.node.id);
        productID = product.node.id;
        productType = product.node.productType;
        variantID = found.node.id;
        inventoryItemID = found.node.inventoryItem.id;
      }
    });

    if (productID && variantID && inventoryItemID && productType) {
      const item = {
        product: {
          id: productID,
          productType: productType,
        },
        variant: {
          id: variantID,
          inventoryItem: {
            id: inventoryItemID,
          },
        },
      };

      return item as {
        product: {
          id: string;
          productType: string;
        };
        variant: {
          id: string;
          inventoryItem: {
            id: string;
          };
        };
      };
    } else {
      return false;
    }
  } catch (err: any) {
    console.log(err.message);
    return false;
  }
};

export const updateInventoryItem = async (
  store: string,
  payload: {
    id: string;
    input: {
      harmonizedSystemCode: string;
      countryCodeOfOrigin: string;
    };
  }
) => {
  try {
    const result = await fetchAdmin<InventoryItemUpdateMutation>(
      store,
      inventoryItemUpdate,
      {
        id: payload.id,
        input: payload.input,
      }
    );

    if (result?.errors && result.errors.length > 0) {
      throw new Error(result.errors[0].message);
    }

    if (!result?.data?.inventoryItemUpdate?.inventoryItem) {
      throw new Error('Inventory item update failed');
    }

    return true;
  } catch (err: any) {
    console.log('ERROR UPDATING INVENTORY ITEM FOR ID:', payload.id);
    console.log(err.message);
    return false;
  }
};

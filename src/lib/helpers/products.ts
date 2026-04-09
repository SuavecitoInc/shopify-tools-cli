import { fetchAdmin } from '../utils';
import {
  tagsAddMutation,
  tagsRemoveMutation,
  searchBySKUQuery,
  metafieldsSetMutation,
  productVariantsBulkUpdateMutation,
} from '../schema/admin';
import type {
  TagsAddMutation,
  TagsRemoveMutation,
  SearchBySkuQuery,
  MetafieldsSetMutation,
  ProductVariantsBulkUpdateMutation,
} from '../types/admin.generated';

export const addShopifyProductTags = async (
  store: string,
  id: string,
  tags: string[]
) => {
  const variables = {
    id: id,
    tags: tags,
  };

  try {
    const updatedProduct = await fetchAdmin<TagsAddMutation>(
      store,
      tagsAddMutation,
      variables
    );

    if (updatedProduct?.errors && updatedProduct.errors.length > 0) {
      throw new Error(updatedProduct.errors[0].message);
    }

    if (
      updatedProduct?.data?.tagsAdd?.userErrors &&
      updatedProduct.data.tagsAdd.userErrors.length > 0
    ) {
      throw new Error(updatedProduct.data.tagsAdd.userErrors[0].message);
    }

    if (!updatedProduct.data) {
      throw new Error('Product tags not updated');
    }

    // console.log('UPDATED PRODUCT RESPONSE');
    // console.log(updatedProduct);

    return updatedProduct;
  } catch (err: any) {
    console.log('ERROR UPDATING PRODUCT TAGS', err.message);
    return false;
  }
};

export const removeShopifyProductTags = async (
  store: string,
  id: string,
  tags: string[]
) => {
  const variables = {
    id: id,
    tags: tags,
  };

  try {
    const updatedProduct = await fetchAdmin<TagsRemoveMutation>(
      store,
      tagsRemoveMutation,
      variables
    );

    if (updatedProduct?.errors && updatedProduct.errors.length > 0) {
      throw new Error(updatedProduct.errors[0].message);
    }

    if (
      updatedProduct?.data?.tagsRemove?.userErrors &&
      updatedProduct.data.tagsRemove.userErrors.length > 0
    ) {
      throw new Error(updatedProduct.data.tagsRemove.userErrors[0].message);
    }

    if (!updatedProduct.data) {
      throw new Error('Product tags not updated');
    }

    // console.log('UPDATED PRODUCT RESPONSE');
    // console.log(updatedProduct);

    return updatedProduct;
  } catch (err: any) {
    console.log(err.message);
    return false;
  }
};

// export const searchBySKU = async (store: string, sku: string) => {
//   const variables = {
//     filter: `sku:${sku}`,
//   };

//   try {
//     const searchResult = await fetchAdmin<SearchBySkuQuery>(
//       store,
//       searchBySKUQuery,
//       variables
//     );

//     if (searchResult?.errors && searchResult.errors.length > 0) {
//       throw new Error(searchResult.errors[0].message);
//     }

//     if (!searchResult?.data.products) {
//       throw new Error('Product not found');
//     }

//     const product = searchResult.data.products.edges[0].node;
//     console.log('FOUND SHOPIFY PRODUCT', product.id);
//     let id: string;
//     if (product.hasOnlyDefaultVariant) {
//       id = product.variants.edges[0].node.id;
//     } else {
//       console.log('MATCHING SKU TO PRODUCT VARIANT');
//       const variants = product.variants.edges;
//       const found = variants.find(function (variant) {
//         return variant.node.sku === sku;
//       });

//       if (!found) {
//         throw new Error('Variant not found');
//       }

//       console.log('VARIANT FOUND', found.node.id);
//       id = found.node.id;
//     }

//     const item = {
//       product: {
//         id: product.id,
//       },
//       variant: {
//         id: id,
//       },
//     };

//     return item;
//   } catch (err: any) {
//     console.log(err.message);
//     return false;
//   }
// };

export const searchBySKU = async (store: string, sku: string) => {
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
    let variantID: string | null = null;
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
        variantID = found.node.id;
      }
    });

    if (productID && variantID) {
      const item = {
        product: {
          id: productID,
        },
        variant: {
          id: variantID,
        },
      };

      return item;
    } else {
      return false;
    }
  } catch (err: any) {
    console.log(err.message);
    return false;
  }
};

export const updateShopifyProductMetafields = async (
  store: string,
  id: string,
  metafield: {
    type: string;
    namespace: string;
    key: string;
    value: string;
  }
) => {
  const variables = {
    metafields: {
      ownerId: id,
      type: metafield.type,
      namespace: metafield.namespace,
      key: metafield.key,
      value: metafield.value,
    },
  };

  console.log('UPDATING OWNER ID', id);
  console.log('METAFIELD VALUE', variables);

  try {
    const updatedMetafield = await fetchAdmin<MetafieldsSetMutation>(
      store,
      metafieldsSetMutation,
      variables
    );

    if (updatedMetafield?.errors && updatedMetafield.errors.length > 0) {
      throw new Error(updatedMetafield.errors[0].message);
    }

    if (
      updatedMetafield?.data?.metafieldsSet?.userErrors &&
      updatedMetafield.data.metafieldsSet.userErrors.length > 0
    ) {
      throw new Error(
        updatedMetafield.data.metafieldsSet.userErrors[0].message
      );
    }

    if (!updatedMetafield.data) {
      throw new Error('Metafield not updated');
    }

    console.log('UPDATED METAFIELD RESPONSE');

    return updatedMetafield;
  } catch (err: any) {
    console.log('ERROR:', err.message);
    return false;
  }
};

export const updateShopifyProductVariant = async (
  store: string,
  variables: {
    productId: string;
    variants: {
      id: string;
      price?: string;
      compareAtPrice?: string | null;
      metafields?: {
        namespace: string;
        key: string;
        type: string;
        value: string;
      }[];
    }[];
  }
) => {
  try {
    const updatedProduct = await fetchAdmin<ProductVariantsBulkUpdateMutation>(
      store,
      productVariantsBulkUpdateMutation,
      variables
    );

    if (updatedProduct?.errors && updatedProduct.errors.length > 0) {
      throw new Error(updatedProduct.errors[0].message);
    }

    if (
      updatedProduct?.data?.productVariantsBulkUpdate?.userErrors &&
      updatedProduct.data.productVariantsBulkUpdate.userErrors.length > 0
    ) {
      throw new Error(
        updatedProduct.data.productVariantsBulkUpdate.userErrors[0].message
      );
    }

    if (!updatedProduct.data) {
      throw new Error('Product price not updated');
    }

    // console.log(
    //   'UPDATED PRODUCT RESPONSE',
    //   JSON.stringify(updatedProduct, null, 2)
    // );

    return updatedProduct;
  } catch (err: any) {
    console.log(err.message);
    return false;
  }
};

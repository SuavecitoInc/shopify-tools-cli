const query = `#graphql
  query searchBySKU($filter: String!) {
    products(first:1, query: $filter) {
      edges {
        node {
          id
          title
          hasOnlyDefaultVariant
          productType
          variants(first:150) {
            edges {
              node {
                sku
                id
                title
                inventoryItem {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default query;

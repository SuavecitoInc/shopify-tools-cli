const query = `#graphql
  query searchBySKU($filter: String!) {
    products(first:1, query: $filter) {
      edges {
        node {
          id
          title
          hasOnlyDefaultVariant
          variants(first:150) {
            edges {
              node {
                sku
                id
                title
              }
            }
          }
        }
      }
    }
  }
`;

export default query;

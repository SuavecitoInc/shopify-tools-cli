const query = `#graphql
  query searchBySKUv2($filter: String!) {
    products(first:5, query: $filter) {
      edges {
        node {
          id
          title
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

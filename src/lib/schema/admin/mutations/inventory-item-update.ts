const mutation = `#graphql
  mutation inventoryItemUpdate($id: ID!, $input: InventoryItemInput!) {
    inventoryItemUpdate(id: $id, input: $input) {
      inventoryItem {
        id
        harmonizedSystemCode
        countryCodeOfOrigin
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export default mutation;

import { gql } from "@apollo/client";

export function makeItemsQuery(fields: string[]) {
    const selectionSet = fields.join("\n");

    return gql`
     query GetItems($params: GetItemRequest!) {
        getItems(params: $params) {
          quantity
          items {
            itemId
            title
            lastStatusId
            lastStatusName
            mainAuthorId
            mainAuthorName
            ${selectionSet}
          }
        }
      }
    `;
}


export const QUERY_SERIES = gql`
query {
    getSeries {
        quantity
        series {
            serieId
            serieName
        }
    }
}
` 
import { gql } from "@apollo/client";

export function itemQueryFactory(fields: string[]) {
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

export const QUERY_COLLECTION = gql`
query {
  getCollections {
    quantity
    collections {
      collectionId
      collectionName
    }
  }
}
`

export const QUERY_READING_STATS = gql`
query GetReadingStats($itemId: Int!) {
  getReadingStats(params: { itemId: $itemId }) {
    stats {
      readingsCount
      lastReadingDate
      isCurrentlyReading
      currentReadingId
      currentPage
      currentPercentage
    }
  }
}
`;
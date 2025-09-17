import { gql } from "@apollo/client";

export function itemQueryFactory(fields: string[]) {
    return gql`
     query GetItems($params: GetItemInput!) {
        getItems(params: $params) {
          quantity
          items {
            itemId
            mainAuthorId
            mainAuthorName
            lastStatusId
            lastStatusName
            lastStatusDate
            title
            subtitle
            titleOriginal
            subtitleOriginal
            isbn
            isbn10
            itemTypeId
            pages
            volume
            edition
            publicationDate
            originalPublicationDate
            serieId
            serieName
            collectionId
            collectionName
            publisherId
            publisherName
            formatId
            languageId
            coverPrice
            paidPrice
            dimensions
            height
            width
            thickness
            summary
            
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
          originalName
          description
          countryName
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

export const QUERY_PUBLISHERS = gql`
  query {
    getPublishers {
      quantity
      publishers {
          publisherId
          publisherName
          description
          countryId
          countryName
          parentId
      }
    }
  }
`

export const QUERY_LANGUAGES = gql`
  query {
    getLanguages {
        quantity
        languages {
            languageId
            languageName
            languageCode
        }
    }
  }`

export const GET_COUNTRIES = gql`
 query {
    getCountries {
      quantity
      countries {
          countryId
          countryName
          continent
          description
      }
  }
 }`

export const QUERY_AUTHORS = gql`
query GetAuthors($params: GetAuthorsRequest) {
      getAuthors(params: $params) {
        quantity
        authors {
            authorId
            authorName
            birthDate
            description
            countryId
            countryName
            languageId
            languageName
        }
    }
}`

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
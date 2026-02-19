import { gql } from "@apollo/client";

export const QUERY_ITEMS = gql`
  query GetItems($params: GetItemInput) {
    getItems(params: $params) {
      quantity
      items {
        id
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
        locationId
        cover
        summary
      }
    }
  }
`;


export const QUERY_SERIES = gql`
query {
  getSeries {
      quantity
      series {
          id
          name
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
      id
      name
      description
    }
  }
}
`

export const QUERY_PUBLISHERS = gql`
  query {
    getPublishers {
      quantity
      publishers {
          id
          name
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
            id
            name
            code
        }
    }
  }`

export const GET_COUNTRIES = gql`
 query {
    getCountries {
      quantity
      countries {
          id
          name
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
            id
            name
            birthDate
            description
            countryId
            countryName
            languageId
            languageName
        }
    }
}`


export const QUERY_STATUS = gql`
  query GetStatus ($params: GetStatusInput) {
    getStatus(params: $params) {
        statuses {
            id
            name
            description
            order
            statusType
        }
        quantity
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

export const QUERY_ITEM_LOCATIONS = gql`
  query GetItemLocations {
      getItemLocations {
          quantity
          locations {
              id
              name
              physicalphysical_location
              description
          }
      }
  }
`


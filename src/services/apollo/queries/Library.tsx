import { gql } from "@apollo/client";

export const QUERY_ITEMS = gql`
  query GetDetailedItems($params: GetItemsInput) {
    getDetailedItems(params: $params) {
      quantity
      items {
        id
        mainAuthorId
        mainAuthorName
        authorsIds
        authorsNames
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
`

export const QUERY_ITEMS_BY_ID = gql`
  query GetItem($id: Int!) {
    getItem(id: $id) {
      item {
        id
        mainAuthorId
        authorsIds
        lastStatusId
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
        collectionId
        publisherId
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
`

export const QUERY_ITEMS_SUMMARY = gql`
  query GetItemSummary($params: GetItemSummaryInput) {
    getItemSummary(params: $params) {
        summary {
            id
            title
            cover
            mainAuthorId
            mainAuthorName
            readingGoalId
            readingGoalYear
            readingGoalAchieved
            readingGoalDateAchieved
            readingId
            readingStartDate
            lastPage
            lastPercentage
        }
    }
  }
`

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
  }
`

export const QUERY_COUNTRIES = gql`
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
  }
`

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
  }
`

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
`

export const QUERY_READING_GOALS = gql`
  query GetReadingGoals($params: GetReadingGoalsInput) {
      getReadingGoals(params: $params) {
          goals {
              id
              item {
                id
                mainAuthorId
                mainAuthorName
                authorsIds
                authorsNames
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
                languageName
                coverPrice
                cover
                paidPrice
                summary
                observation
                lastStatusId
                locationId
                lastStatusName
                lastStatusDate
              }
              year
              acheived
              dateAchieved
          }
      }
  }
`

export const QUERY_ITEM_LOCATIONS = gql`
  query GetItemLocations {
      getItemLocations {
          quantity
          locations {
              id
              name
              physicalLocation
              description
          }
      }
  }
`

export const QUERY_READING = gql`
  query GetReadings($params: GetReadingsInput) {
    getReadings(params: $params) {
        quantity
        readings {
            id
            itemId
            itemTitle
            startDate
            finishDate
            number
            active
            statusId
            statusName
        }
    }
  }
`
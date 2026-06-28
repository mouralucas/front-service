import { gql } from "@apollo/client";


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





export const QUERY_READING_QUEUE = gql`
  query GetReadingQueue($params: GetReadingQueueInput) {
      getReadingQueue(params: $params) {
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




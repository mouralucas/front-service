import { gql } from "@apollo/client";





export const CREATE_AUTHOR_MUTATION = gql`
  mutation CreateAuthor($input: CreateAuthorInput!) {
    createAuthor(author: $input) {
        author {
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

export const CREATE_SERIE_MUTATION = gql`
  mutation CreateSerie($input: CreateSerieRequest) {
    createSerie(serie: $input) {
      created
      id
      name
    }
  }
`

export const CREATE_COLLECTION_MUTATION = gql`
  mutation CreateCollection($input: CreateCollectionRequest) {
    createCollection(collection: $input) {
      created
      id
      name
    }
  }
`





export const UPDATE_READING_STATUS_MUTATION = gql`
  mutation UpdateReadingStatus($params: UpdatedReadingStatusInput) {
    updateReadingStatus(params: $params) {
        updatedStatus
    }
  }
`

export const UPDATE_ITEM_ON_QUEUE = gql`
  mutation UpdateReadingQueue($params: UpdateReadingQueueInput!) {
    updateReadingQueue(params: $params) {
        created
        readingGoalId
        currentStatus
        isCurrentlyInQueue
        itemId
        itemTitle
    }
  }
`
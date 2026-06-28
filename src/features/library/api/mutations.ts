import { gql } from "@apollo/client";


export const CREATE_ITEM_MUTATION = gql`
  mutation CreateItem($input: CreateItemInput) {
    createItem(item: $input) {
      created
      id
      title
    }
  }
`

export const UPDATE_ITEM_MUTATION = gql`
  mutation UpdateItem($input: UpdateItemInput) {
    updateItem(item: $input) {
      created
      id
      title
    }
  }
`

export const CREATE_READING_MUTATION = gql`
  mutation CreateReading($input: CreateReadingInput!) {
    createReading(reading: $input) {
      created
      readingId
      itemTitle
    }
  }
`;

export const CREATE_READING_PROGRESS_MUTATION = gql`
  mutation CreateReadingProgress($input: CreateReadingProgressInput!) {
    createReadingProgress(progress: $input)  {
        created
        itemTitle
        readingProgressId
    }
}`
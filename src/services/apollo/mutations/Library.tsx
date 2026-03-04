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

export const CREATE_READING_MUTATION = gql`
  mutation CreateReading($input: CreateReadingInput!) {
    createReading(reading: $input) {
      reading {
        id
        itemId
        itemTitle
        startDate
        finishDate
        active
        statusId
        statusName
      }
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
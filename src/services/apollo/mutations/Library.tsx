import { gql } from "@apollo/client";



export const CREATE_ITEM_MUTATION = gql`
  mutation CreateItem($input: CreateItemInput) {
    createItem(item: $input) {
      item {
        itemId
      }
    }
  }
`


export const CREATE_AUTHOR_MUTATION = gql`
  mutation CreateAuthor($input: CreateAuthorInput!) {
    createAuthor(author: $input) {
        author {
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
}
`

export const CREATE_READING_MUTATION = gql`
  mutation CreateReading($input: CreateReadingInput!) {
    createReading(reading: $input) {
      reading {
        readingId
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
        itemTitle
        pagesRead
        readingProgress {
            readingProgressId
            date
            page
            percentage
            rate
            comment
        }
    }
}`
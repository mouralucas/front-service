import { gql } from "@apollo/client";


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
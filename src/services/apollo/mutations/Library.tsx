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
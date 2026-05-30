import { gql } from "@apollo/client"


// Account mutations
export const CREATE_ACCOUNT_TRANSACTION = gql`
    mutation CreateAccountTransaction($input: CreateAccountTransactionInput!) {
        createAccountTransaction(transaction: $input) {
            success
            transactionId
        }
    }
`

export const UPDATE_ACCOUNT_TRANSACTION = gql`
    mutation CreateAccountTransaction($input: UpdateAccountTransactionInput!) {
        updateAccountTransaction(transaction: $input) {
            success
            transactionId
        }
    }
`

// Investment mutations

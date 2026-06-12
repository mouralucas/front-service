import { gql } from "@apollo/client";


export const CREATE_CREDIT_CARD_TRANSACTION_MUTATION = gql`
    mutation CreateCreditCardTransaction (
            $transaction: CreditCardTransactionInput!
        ) {
            createCreditCardTransaction(
                transaction: $transaction
            ) {
                success
                ids
            }
        }
`

export const UPDATE_CREDIT_CARD_TRANSACTION_MUTATION = gql`
    mutation UpdateCreditCardTransaction (
            $transaction: CreditCardTransactionInput!
        ) {
            updateCreditCardTransaction(
                transaction: $transaction
            ) {
                success
                ids
            }
        }
`
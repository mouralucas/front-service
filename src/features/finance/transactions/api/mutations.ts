import { gql } from "@apollo/client";


export const CREATE_CREDIT_CARD_TRANSACTION_MUTATION = gql`
    mutation CreateCreditCardTransaction (
            $transaction: CreateCreditCardTransactionInput!
        ) {
            createCreditCardTransaction(
                transaction: $transaction
            ) {
                success
                ids
            }
        }
`
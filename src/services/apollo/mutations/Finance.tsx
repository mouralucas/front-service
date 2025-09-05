import { gql } from "@apollo/client"


export const CREATE_ACCOUNT_TRANSACTION = gql`
mutation CreateAccountTransaction($input: CreateAccountTransactionInput!) {
    createAccountTransaction(transaction: $input) {
        transaction {
            transactionId
            ownerId
            accountId
            accountNickname
            period
            currencyId
            currencySymbol
            amount
            transactionDate
            categoryId
            categoryName
            description
            transactionCurrencyId
            transactionAmount
            exchangeRate
            taxPerc
            tax
            spreadPerc
            spread
            effectiveRate
        }
    }
}`


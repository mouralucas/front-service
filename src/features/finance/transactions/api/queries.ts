import { gql } from "@apollo/client";

export const QUERY_ACCOUNT_TRANSACTIONS = gql`
query GetAccountTransactions($params: GetAccountTransactionInput) {
    getAccountTransactions(params: $params) {
        quantity
        transactions {
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
}
`
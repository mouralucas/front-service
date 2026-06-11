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

export const QUERY_CREDIT_CARD_TRANSACTIONS = gql`
    query GetCreditCardTransactions($params: GetCreditCardTransactionsInput) {
        getCreditCardTransactions(params: $params) {
            quantity
            transactions {
                id
                creditCardNickname
                creditCardId
                period
                dueDate
                transactionDate
                amount
                categoryId
                categoryName
                currencyId
                currencySymbol
                transactionCurrencyId
                transactionCurrencySymbol
                transactionAmount
                isInstallment
                currentInstallment
                installments
                totalAmount
                description
                createdAt
                editedAt
            }
        }
    }
`

export const QUERY_CREDIT_CARD_TRANSACTION_METADATA_BY_ID = gql`
query GetCreditCardTransactionMetadataById($param: Int!) {
    getCreditCardTransactionMetadataById(id: $param) {
        transactionMetadata {
            id
            creditCardId
            transactionDate
            totalAmount
            totalInstallments
            installments {
                transactionId
                currentInstallment
                dueDate
                amount
            }
            categoryId
            currencyId
            isInternationalTransaction
            transactionCurrencyId
            transactionAmount
            dollarExchangeRate
            currencyDollarExchangeRate
            description
        }
    }
}
`

export const QUERY_INSTALLMENT_DUE_DATE = gql`
    query GetInstallmentDueDates($params: GetInstallmentsDueDatesInput) {
        getCreditCardInstallmentDueDates(params: $params) {
            dueDates {
                currentInstallment
                dueDate
            }
        }
    }
`

export const QUERY_TRANSACTION_CATEGORIES = gql`
    query {
        getCategories {
            quantity
            categories {
                categoryId
                categoryName
                comment
                order
                description
            }
        }
}
`
import { gql } from "@apollo/client";


export const QUERY_CURRENCY = gql`
    query {
        getCurrencies {
        quantity
        currencies {
            currencyId
            name
            symbol
        }
    }
}`

export const QUERY_CATEGORIES = gql`
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
}`


export const QUERY_CREDIT_CARDS = gql`
    query GetCreditCards($params: GetCreditCardsInput) {
        getCreditCards(params: $params) {
            quantity
            creditCards {
                creditCardId
                nickname
            }
        }
    }
`

export const QUERY_ACCOUNTS = gql`
query GetAccounts($params: GetAccountsInput) {
    getAccounts(params: $params) {
        quantity
        accounts {
            accountId
            active
            bankId
            nickname
            description
            branch
            number
            openDate
            closeDate
            typeId
            currencyId
            currencySymbol
        }
    }
}`

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
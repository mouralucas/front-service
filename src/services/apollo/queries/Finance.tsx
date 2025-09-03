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
        }
    }
}`
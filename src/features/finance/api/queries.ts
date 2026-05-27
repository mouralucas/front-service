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

export const QUERY_FINANCE_SUMMARY = gql`
    query GetFinanceSummary {
        getFinanceSummary {
            investment {
                totalInvested
                totalGross
                totalGrowth
                totalGrowthPercentage
                activeInvestmentsCount
                lastMonthGrowthPercentage
            }
        }
    }
`

export const QUERY_INDEXER_SERIES = gql`
    query GetIndexerSeries($params: GetIndexerSeriesInput!) {
        getIndexerSeries(params: $params) {
            quantity
            series {
                id
                indexerName
                period
                value
                periodicityName
            }
        }
    }
`

export const QUERY_PERIODICITY = gql`
    query GetPeriodicity {
        getPeriodicity {
            quantity
            periodicities {
                id
                name
                description
                order
            }
        }
    }
`
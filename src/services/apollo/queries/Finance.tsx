import { gql } from "@apollo/client";

// General queries
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

// Credit card queries
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

// Account queries
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

// Investment Queries
export const QUERY_BRAZILIAN_FUND_INVESTMENTS = gql`
    query GetBrazilianFundInvestments($params: GetInvestmentBrazilianFundsInput) {
        getInvestmentsBrazilianFunds(params: $params) {
            quantity
            investments {
                investmentId
                ownerId
                custodianId
                accountId
                name
                price
                quantity
                amount
                transactionDate
                investmentTypeId
                countryId
                currencyId
                currencySymbol
                objectiveId
                objectiveName
                isSettled
                observation
                fundId
                fundName
                investmentQuotationDate
                investmentSettlementDate
                redemptionQuotationDate
                redemptionSettlementDate
            }
        }
    }
`

export const QUERY_INVESTMENTS = gql`
    query GetInvestments($params: GetInvestmentsInput) {
        getInvestments(params: $params) {
            quantity
            investments {
                id
                custodianId
                accountId
                name
                typeId
                transactionDate
                maturityDate
                quantity
                price
                amount
                contractedRate
                currencyId
                currencySymbol
                indexerTypeId
                indexerTypeName
                indexerId
                indexerName
                liquidityId
                liquidityName
                isSettled
                settlementDate
                settlementAmount
                countryId
                countryName
                observation
                objectiveId
                grossAmount
                percentageChange
                totalContribution
                totalWithdrawn
            }
        }
    }
`

export const QUERY_INVESTMENT_BY_ID = gql`
    query GetInvestmentById($params: GetInvestmentByIdInput!) {
        getInvestmentById(params: $params) {
            investment {
                id
                custodianId
                accountId
                name
                typeId
                transactionDate
                maturityDate
                quantity
                price
                amount
                contractedRate
                currencyId
                currencySymbol
                indexerTypeId
                indexerTypeName
                indexerId
                indexerName
                liquidityId
                liquidityName
                isSettled
                settlementDate
                settlementAmount
                countryId
                countryName
                observation
                objectiveId
            }
        }
    }
`

export const QUERY_INVESTMENT_STATEMENTS = gql`
    query GetInvestmentStatements($params: GetInvestmentStatementsInput) {
        getInvestmentStatements(params: $params) {
            quantity
            statements {
                id
                investmentId
                period
                previousAmount
                contribution
                withdrawn
                grossAmount
                totalTax
                totalFee
                referenceDate
                atMaturity
                currencyId
                valueChange
                percentageChange
                netAmount
            }
        }
    }
`

export const QUERY_INVESTMENT_STATEMENT = gql`
    query GetInvestmentStatement($params: GetInvestmentStatementInput!) {
        getInvestmentStatement(params: $params) {
            statement {
                id
                investmentId
                period
                previousAmount
                contribution
                withdrawn
                grossAmount
                totalTax
                totalFee
                referenceDate
                atMaturity
                valueChange
                percentageChange
                netAmount
            }
        }
    }
`

export const QUERY_INVESTMENT_STATEMENT_METADATA = gql`
    query GetStatementMetadata($params: GetStatementMetadataInput) {
        getStatementMetadata(params: $params) {
            period
            referenceDate
            contribution
            investmentName
            investmentTransactionDate
            investmentMaturityDate
        }
    }
`

export const QUERY_INVESTMENT_OBJECTIVES = gql`
    query getInvestmentObjectives($params: GetInvestmentObjectivesInput) {
        getInvestmentObjectives(params: $params) {
            quantity
            objectives {
                id
                ownerId
                title
                description
                currencyId
                currencySymbol
                amount
                currentAmount
                estimateDeadline
            }
        }
    }
`

export const QUERY_INVESTMENT_PERFORMANCE = gql`
query GetInvestmentPerformance($params: GetInvestmentPerformanceInput) {
    getInvestmentPerformance(params: $params) {
        xLabel
        data {
            data
            label
        }
    }
}
`

// Sumary query
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
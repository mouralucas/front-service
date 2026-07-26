import { gql } from "@apollo/client";


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
                isLatestStatementPeriod
                latestStatementPeriod
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

export const QUERY_INVESTMENT_TYPES = gql `
    query GetInvestmentTypes {
        getInvestmentTypes {
            quantity
            investmentTypes {
                id
                name
                description
                parentId
                investmentCategoryId
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
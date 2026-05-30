import { gql } from "@apollo/client"

export const CREATE_INVESTMENT_STATEMENT = gql`
    mutation CreateInvestmentStatement($statement: CreateInvestmentStatementInput) {
        createInvestmentStatement(statement: $statement) {
            created
            statementId
        }
    }
`

export const UPDATE_INVESTMENT_STATEMENT = gql`
    mutation UpdateInvestmentStatement($statement: UpdateInvestmentStatementInput) {
        updateInvestmentStatement(statement: $statement) {
            updated
            statementId
        }
    }
`
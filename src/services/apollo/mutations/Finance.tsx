import { gql } from "@apollo/client"


// Account mutations
export const CREATE_ACCOUNT_TRANSACTION = gql`
    mutation CreateAccountTransaction($input: CreateAccountTransactionInput!) {
        createAccountTransaction(transaction: $input) {
            transaction {
                transactionId
            }
        }
    }
`

export const UPDATE_ACCOUNT_TRANSACTION = gql`
    mutation CreateAccountTransaction($input: UpdateAccountTransactionInput!) {
        updateAccountTransaction(transaction: $input) {
            transaction {
                transactionId
            }
        }
    }
`

// Investment mutations
export const CREATE_INVESTMENT_STATEMENT = gql`
    mutation CreateInvestmentStatement($statement: CreateInvestmentStatementInput) {
        createInvestmentStatement(statement: $statement) {
            created
            statementId
        }
    }
`
import { gql } from "@apollo/client";

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
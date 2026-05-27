import { Account } from "./Accounts";

export interface GetAccountsQuery {
    getAccounts: {
        quantity: number;
        accounts: Account[];
    };
}
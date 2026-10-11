import { Account } from "./Accounts";

export interface QueryAccount {
    getAccounts: {
        quantity: number;
        accounts: Account[];
    };
}
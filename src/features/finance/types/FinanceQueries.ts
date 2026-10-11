import { Account } from "./Accounts";
import { Currency } from "./Finance";


export interface QueryAccounts {
    getAccounts: {
        quantity: number;
        accounts: Account[];
    }
}

export interface QueryCurrency {
    getCurrencies: {
        quantity: number;
        currencies: Currency[]
    }
}
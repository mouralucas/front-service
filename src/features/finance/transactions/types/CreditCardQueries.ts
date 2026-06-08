import { CreditCardTransaction } from "./CreditCard";


export interface CreditCardTransactionQuery {
    getCreditCardTransactions: {
        quantity: number;
        transactions: CreditCardTransaction[];
    }
}
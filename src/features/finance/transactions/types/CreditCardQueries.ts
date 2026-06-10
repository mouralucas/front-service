import { CreditCardTransaction, CreditCardTransactionMetadata } from "./CreditCard";


export interface CreditCardTransactionQuery {
    getCreditCardTransactions: {
        quantity: number;
        transactions: CreditCardTransaction[];
    }
}

export interface GetCreditCardTransactionsMetadataById {
    getCreditCardTransactionMetadataById: {
        transactionMetadata: CreditCardTransactionMetadata;
    }
} 
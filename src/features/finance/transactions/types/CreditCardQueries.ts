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

export interface CreditCardMonthlyBill {
    creditCardId: number;
    creditCardNickname?: string | null;
    period: number;
    totalAmount: number;
    quantityTransactions: number;
    transactions: CreditCardTransaction[];
}

export interface GetCreditCardMonthlyBillQuery {
    getCreditCardMonthlyBill: {
        bill: CreditCardMonthlyBill[];
    };
}
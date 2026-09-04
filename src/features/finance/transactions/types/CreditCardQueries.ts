import { CreditCardBillHistoricalData as CreditCardBillHistoricalData, CreditCardMonthlyBill, CreditCardTransaction, CreditCardTransactionMetadata } from "./CreditCard";


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



export interface GetCreditCardMonthlyBillQuery {
    getCreditCardMonthlyBill: {
        bill: CreditCardMonthlyBill[];
    };
}

export interface GetCreditCardBillHistoricalDataQuery {
    getCreditCardBillHistoricalData: {
        historicalData: CreditCardBillHistoricalData;
    };
}
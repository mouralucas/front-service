// Account interfaces
import { AccountTransaction } from "../features/finance/type/Accounts";

// TODO: update to types in features folder
export type CreateAccountTransactionInput = Omit<
    AccountTransaction,
    "currencySymbol" | "accountNickname" | "createdAt" | "lastEditedAt" | "period" | "ownerId"
>;

// Credit card interfaces

export interface CreditCardBill {
    creditCardId?: string | null;
    period: number;
    totalAmount: number;
}

export interface UpdateCreditCardTransaction {
    transactionId: number | null;
    creditCardId: string;
    transactionDate: string;
    categoryId: string;
    currencyId: string;

    // International transactions information
    isInternationalTransaction: boolean;
    transactionCurrencyId: string;
    transactionAmount: number;
    dollarExchangeRate?: number;
    currencyDollarExchangeRate?: number;
    taxDetail?: TaxFeeDetail[];
    totalTax?: number

    description: string;
    isInstallment: boolean;
    currentInstallment: number;
    dueDate: string;
    amount: number;
    totInstallments: number
    totalAmount: number;
    parentId: number | null;
    createdAt?: string;
    lastEditedAt?: string;
}

export interface CreditCardBillHistory {
    id: number;
    period: number;
    totalAmount: number;
    creditCards: {
        nickname: string;
        currencySymbol: string;
        totalInstallments: number;
        total: number;
    }
}

//Finance

export interface InvestmentAllocation {
    typeAllocation: [{
        name: string,
        total: number
    }],
    categoryAllocation: [{
        name: string,
        total: number
    }]
}

export interface TaxFee {
    taxFeeId: string;
    name: string
    description: string;
    acronyms: string;
    countryId: string;
    type: string
}



export interface Currency {
    currencyId: string
    name: string
    symbol: string
}



export interface Ipca {
    period: number,
    value: number,
    periodicity: string,
}
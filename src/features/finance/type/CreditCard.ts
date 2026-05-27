export interface CreditCard {
    creditCardId: string;
    active: boolean;
    ownerId: string;
    nickname: string;
    accountId: string;
    currencyId: string;
    issueDate: string;
    cancellationDate: string;
    dueDay: number;
    closeDay: number;
}

export interface CreditCardTransaction {
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
    installments: CreditCardInstalments[];
    totInstallments: number;
    currentInstallment: number
    totalAmount: number;
    parentId: number | null;
    createdAt?: string;
    lastEditedAt?: string;
}

export interface CreditCardInstalments {
    currentInstallment: number;
    amount: number;
    dueDate: string;
}

export interface TaxFeeDetail {
    currencyId: string;
    taxFeeId: string;
    amount: number;
}
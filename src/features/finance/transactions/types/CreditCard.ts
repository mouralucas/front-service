

export interface CreditCardTransaction {
    id?: string | null;
    ownerId: string;
    creditCardId: string;

    creditCardNickname?: string | null;

    period: number;
    dueDate: string;
    transactionDate: string;

    amount: number;

    categoryId: string;
    categoryName?: string | null;

    currencyId: string;
    currencySymbol?: string | null;

    transactionCurrencyId?: string | null;
    transactionCurrencySymbol?: string | null;

    transactionAmount: number;

    dollarExchangeRate?: number | null;
    currencyDollarExchangeRate?: number | null;

    totalTax?: number | null;

    isInstallment: boolean;
    currentInstallment: number;
    installments: number;

    totalAmount?: number | null;
    parentId?: number | null;

    description?: string | null;

    origin: string;

    isValidated: boolean;

    operationType?: string | null;

    createdAt: string;
    editedAt?: string | null;
}

export interface CreditCardTransactionMetadata {
    id?: string | null;
    creditCardId: string;
    transactionDate: string;
    isInstallment: boolean;
    totalAmount: number;
    totalInstallments: number;
    installments: CreditCardInstalments[];
    categoryId: string;
    currencyId: string;
    isInternationalTransaction: Boolean;
    transactionCurrencyId?: string | null;
    transactionAmount?: number | null;
    dollarExchangeRate?: number | null;
    currencyDollarExchangeRate?: number | null;
    description?: string | null;
}

export interface CreditCardInstalments {
    transactionId?: number | null;
    currentInstallment: number;
    amount: number;
    dueDate: string;
}

export interface CreditCardBill {
    creditCardId?: string | null;
    period: number;
    totalAmount: number;
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
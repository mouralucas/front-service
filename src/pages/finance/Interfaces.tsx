// Account interfaces
export interface Account {
    accountId: string
    nickname: string
    branch: string
    number: string
    openAt: string
    closeAt: string
}

export interface AccountTransaction {
    transactionId?: number | null
    ownerId: string
    accountId: string
    period: number
    currencyId: string
    amount: number
    transactionDate: string
    categoryId: string
    description: string | undefined
    transactionCurrencyId: string
    exchangeRate: number | null
    taxPerc: number | null
    tax: number | null
    spreadPerc: number | null
    spread: number | null
    effectiveRate: number | null
    createdAt: Date | null
    lastEditedAt: Date | null
}

// Credit card interfaces
export interface CreditCard {
    creditCardId: string
    nickname: string
    description: string
    closingAt: string //maybe date
    dueAt: string //maybe date
}

// Investment Interfaces
export interface Investment {
    investmentId?: string | null,
    transactionDate: string
    name: string;
    accountId: string;
    investmentTypeId: string;
    maturityDate: string | null;
    quantity: number;
    price: number;
    amount: number;
    contractedRate: string;
    currencyId: string;
    indexerTypeId: string;
    indexerId: string;
    liquidityId: string;
    liquidationDate?: string | null;
    liquidationAmount?: number;
    countryId: string;
    observation?: string;
}

export interface InvestmentType {
    investmentTypeId: string
    investmentTypeName: string
    description: string
    parentId: string
    investmentCategoryId: string
}

// Other
export interface Currency {
    currencyId: string
    name: string
    symbol: string
}
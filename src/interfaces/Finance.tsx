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
    totInstallments: number
    totalAmount: number;
    parentId: number | null;
    createdAt?: string;
    lastEditedAt?: string;
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

export interface InvestmentStatement {
    statementId?: string | null
    investmentId: string;
    name: string;
    transactionDate: string;
    maturityDate: string | null;
    referenceDate: string | null;
    period: string;
    grossAmount: number;
    netAmount: number;
    taxDetails: TaxFeeDetail[];
    feeDetails: TaxFeeDetail[];
}

//Finance
export interface IndexerType {
    indexerTypeId: string;
    indexerTypeName: string;
    description: string;
}

export interface Indexer {
    indexerId: string;
    indexerName: string;
    description: string;
}

export interface Liquidity {
    liquidityId: string;
    liquidityName: string;
    description: string;
}

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

// Other
export interface Currency {
    currencyId: string
    name: string
    symbol: string
}

export interface Category {
    categoryId: string
    name: string
    description: string
    fatherId: string
    fatherName: string
}
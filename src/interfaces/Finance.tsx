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

// Investment Interfaces
export interface Investment {
    id?: string | null,
    transactionDate: string
    name: string;
    accountId: string;
    typeId: string;
    maturityDate: string | null;
    quantity: number;
    price: number;
    amount: number;
    totalContribution: number;
    totalWithdrawn: number;
    grossAmount: number;
    contractedRate: string;
    currencyId: string;
    indexerTypeId: string;
    indexerId: string;
    liquidityId: string;
    settlementDate?: string | null;
    settlementAmount?: number;
    countryId: string;
    observation?: string;
    objectiveId?: string | null;
    percentageChange?: number;
} 

export interface BrazilianFundInvestment {
    investmentId?: string | null;
    transactionDate: string;
    fundId: string;
    accountId: string;
    name: string;
    investmentTypeId: string; // maybe not needed in UI
    quantity: number;
    price: number;
    amount: number;
    currencyId: string;
    countryId: string;
    settlementDate?: string | null;
    settlementAmount?: number | null;
    observation?: string | null;
    objectiveId?: string | null;
}

export interface InvestmentType {
    investmentTypeId: string
    investmentTypeName: string
    description: string
    parentId: string
    investmentCategoryId: string
}

export interface InvestmentStatement {
    id?: string | null
    investmentId: string;
    name: string;
    transactionDate: string;
    maturityDate: string | null;
    referenceDate: string | null;
    period: string;
    contribution: number;
    withdrawn: number;
    grossAmount: number;
    netAmount: number;
    valueChange: number;
    percentageChange: number;
    taxDetails: TaxFeeDetail[];
    feeDetails: TaxFeeDetail[];
}

export interface InvestmentObjective {
    objectiveId: string | null;
    title: string;
    description: string;
    amount: number;
    currencyId: string;
    estimatedDeadline: string;
}

//Finance
export interface Bank {
    bankId: string | null;
    bankName: string;
    code: number | null;
}

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

export interface BrazilianFunds {
    fundId: string;
    name: string;
    fundCnpj: string;
    administrator: string;
    administratorCnpj: string;
    status: string;
    startDate: string;
    minimumBalance: number;
    minimumInvestment: number;
    minimumWithdraw: number;
    initialInvestment: number;
    investmentQuotation: string;
    redemptionQuotation: string;
    redemptionSettlement: string;
    fees: any;
    benchmark: string;
}

export interface Currency {
    currencyId: string
    name: string
    symbol: string
}

export interface Category {
    categoryId: string | null
    name: string
    description?: string
    fatherId?: string
    fatherName?: string
}

export interface Ipca {
    period: number,
    value: number,
    periodicity: string,
}
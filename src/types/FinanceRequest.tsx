import { BrazilianFundInvestment, Investment, InvestmentObjective, InvestmentStatement, InvestmentType } from "../features/finance/investment/types/Investment";
import { AccountTransaction } from "../features/finance/transactions/types/Account";
import { CreditCardBill, CreditCardBillHistory, CreditCardTransaction } from "../features/finance/transactions/types/CreditCard";
import { Account } from "../features/finance/type/Accounts";
import { CreditCard } from "../features/finance/type/CreditCard";
import { Bank, BrazilianFunds, Category, Currency, Indexer, IndexerType, Liquidity, TaxFee } from "../features/finance/type/Finance";


// Account
export interface GetAccountResponse {
    quantity: number;
    accounts: Account[];
}

export interface AccountTransactionResponse {
    quantity: number
    transactions: AccountTransaction[]
}

// Credit card
export interface GetCreditCardsResponse {
    quantity: number;
    creditCards: CreditCard[];
}

export interface GetCreditCardTransactionResponse {
    success: boolean
    quantity: number
    transactions: CreditCardTransaction[]
}

export interface GetCreditCardBillHistoryResponse {
    creditCardBillHistory: CreditCardBillHistory[];
}

export interface CreditCardBillConsolidatedResponse {
    average: number;
    goal: number;
    periodRange: string[];
    bill: CreditCardBill[];
    billStacked: any;
    series: string[];
}


// Investment
export interface InvestmentResponse {
    success: boolean
    quantity: number
    investments: Investment[]
}

export interface GetInvestmentTypesResponse {
    quantity: number;
    investmentTypes: InvestmentType[];
}

export interface GetInvestmentPerformanceResponse {
    indexerName: string;
    data: { period: number, variation: number, indexerVariation: number }[]
    series: { value: string, name: string }[];
}

export interface GetInvestmentStatementResponse {
    quantity: number;
    statements: InvestmentStatement[];
}

export interface GetInvestmentObjectivesResponse {
    quantity: number;
    objectives: InvestmentObjective[];
}

export interface GetBrazilianFundInvestmentResponse {
    success: boolean
    quantity: number
    investments: BrazilianFundInvestment[]
}

// Finance
export interface GetBankResponse {
    quantity: number;
    banks: Bank[];
}

export interface GetIndexerTypesResponse {
    quantity: number;
    indexerTypes: IndexerType[]
}

export interface GetIndexersResponse {
    quantity: number;
    indexers: Indexer[]
}

export interface GetLiquidityResponse {
    quantity: number;
    liquidity: Liquidity[];
}

export interface GetCurrencyResponse {
    quantity: number;
    currencies: Currency[];
}

export interface GetCategoryResponse {
    quantity: number;
    categories: Category[];
}

export interface GetBrazilianFundResponse {
    quantity: number;
    funds: BrazilianFunds[]
}

/**
 * @deprecated TaxFee are not used anymore, 1
 *      but the interface is still used in some places, so it will be kept for now.
 */
export interface GetTaxFeeResponse {
    quantity: number;
    taxFee: TaxFee[];
}


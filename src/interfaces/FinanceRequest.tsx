import {Account, Category, CreditCard, Currency, Indexer, IndexerType, InvestmentType, Liquidity, TaxFee} from "./Finance.tsx";


// Account
export interface GetAccountResponse {
    quantity: number;
    accounts: Account[];
}

// Credit card
export interface GetCreditCardsResponse {
    quantity: number;
    creditCards: CreditCard[];
}


// Investment
export interface GetInvestmentTypesResponse {
    quantity: number;
    investmentTypes: InvestmentType[];
}

export interface GetInvestmentPerformanceResponse {
    data: { period: number, variation: number, indexerVariation: number }[]
    series: { value: string, name: string }[];
}

// Finance
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

export interface GetTaxFeeResponse {
    quantity: number;
    taxFee: TaxFee[];
}


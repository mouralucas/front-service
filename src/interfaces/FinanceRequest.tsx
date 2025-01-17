import {Account, Category, CreditCard, Currency, Indexer, IndexerType, InvestmentStatement, InvestmentType, Liquidity, TaxFee} from "./Finance.tsx";


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
    indexerName: string;
    data: { period: number, variation: number, indexerVariation: number }[]
    series: { value: string, name: string }[];
}

export interface GetStatementResponse {
    quantity: number;
    statement: InvestmentStatement[];
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


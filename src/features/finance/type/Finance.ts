export interface Bank {
    bankId: string | null;
    bankName: string;
    code: number | null;
}

/**
 * @deprecated TaxFee are not used anymore in new transactions/investments, 
 *      but the interface is still used in some places, so it will be kept for now.
 */
export interface TaxFeeDetail {
    currencyId: string;
    taxFeeId: string;
    amount: number;
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

/**
 * @deprecated BrazilianFunds are not used anymore in new investments, 
 *      but the interface is still used in some places, so it will be kept for now.
 */
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

export interface Category {
    categoryId: string | null
    name: string
    description?: string
    fatherId?: string
    fatherName?: string
}
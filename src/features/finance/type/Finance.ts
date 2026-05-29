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
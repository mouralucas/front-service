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

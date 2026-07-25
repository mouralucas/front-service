
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

/**
 * @deprecated Funds are not used anymore in the application, will be merged with investment,
 *          but the interface is still used in some places, so it will be kept for now.
 */
export interface BrazilianFundInvestment {
    investmentId?: string | null;
    transactionDate: string;
    fundId: string;
    accountId: string;
    name: string;
    investmentTypeId: string;
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
    id: string
    name: string
    description: string
    parentId: string
    investmentCategoryId: string
}

export interface InvestmentStatement {
    id?: string | null
    investmentId: string;
    name: string | null;
    transactionDate: string | null;
    maturityDate: string | null;
    referenceDate: string | null;
    period: number | null;
    contribution: number;
    withdrawn: number;
    grossAmount: number;
    netAmount: number;
    valueChange: number;
    percentageChange: number;
}

export interface InvestmentStatementMetadata {
    period: number;
    referenceDate: string;
    contribution: number;
    investmentName: string | null;
    investmentTransactionDate: string | null;
    investmentMaturityDate: string | null;
}

export interface InvestmentObjective {
    objectiveId: string | null;
    title: string;
    description: string;
    amount: number;
    currencyId: string;
    estimatedDeadline: string;
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
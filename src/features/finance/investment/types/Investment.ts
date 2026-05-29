import { TaxFeeDetail } from "../../type/Finance";

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
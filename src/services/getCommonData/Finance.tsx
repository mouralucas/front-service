import { toast } from "react-toastify";
import { GetBankResponse, GetBrazilianFundResponse, GetCategoryResponse, GetIndexersResponse, GetIndexerTypesResponse, GetInvestmentObjectivesResponse, GetInvestmentTypesResponse, GetLiquidityResponse } from "../../types/FinanceRequest.tsx";
import { URL_FINANCE_BANK, URL_FINANCE_BRAZILIAN_FUNDS, URL_FINANCE_CATEGORIES, URL_FINANCE_INDEXER, URL_FINANCE_INDEXER_TYPE, URL_FINANCE_INVESTMENT_OBJECTIVE, URL_FINANCE_INVESTMENT_TYPE, URL_FINANCE_LIQUIDITY } from "../axios/ApiUrls.tsx";
import { getFinanceData } from "../axios/Get.tsx";
import { Bank, BrazilianFunds, Category, Indexer, IndexerType, Liquidity } from "../../features/finance/type/Finance";
import { InvestmentObjective, InvestmentType } from "../../features/finance/investment/types/Investment.ts";


// // Credit cards
// export const getCreditCards = async (): Promise<any[]> => {
//     try {
//         const response: GetCreditCardsResponse = await getFinanceData(URL_FINANCE_CREDIT_CARD);
//         return response.creditCards.map((i: CreditCard) => ({
//             value: i.creditCardId,
//             label: i.nickname,
//         }));
//     } catch {
//         toast.error('Houve um erro ao buscar os cartões de crédito');
//         return [];
//     }
// };

/**
 * @deprecated All Rest APIs are now deprecated, use Graphql instead
 */
export const getInvestmentTypes = async (): Promise<any[]> => {
    try {
        const response: GetInvestmentTypesResponse = await getFinanceData(URL_FINANCE_INVESTMENT_TYPE);
        return response.investmentTypes.map((i: InvestmentType) => ({
            value: i.id,
            label: i.name,
        }));
    } catch {
        toast.error('Houve um erro ao buscar os cartões de crédito');
        return [];
    }
};

/**
 * @deprecated All Rest APIs are now deprecated, use Graphql instead
 */
export const getInvestmentObjectives = async (selectFormat: boolean): Promise<any[]> => {
    try {
        const response: GetInvestmentObjectivesResponse = await getFinanceData(URL_FINANCE_INVESTMENT_OBJECTIVE);
        if (selectFormat) {
            return response.objectives.map((i: InvestmentObjective) => ({
                value: i.objectiveId,
                label: i.title,
            }))
        }

        return response.objectives
    } catch {
        toast.error('Houve um erro ao buscas os objetivos');
        return []
    }
}

/**
 * @deprecated All Rest APIs are now deprecated, use Graphql instead
 */
export const getBanks = async (selectFormat: boolean): Promise<any[]> => {
    try {
        const response: GetBankResponse = await getFinanceData(URL_FINANCE_BANK)
        if (selectFormat) {
            return response.banks.map((i: Bank) => ({
                value: i.bankId,
                label: i.bankName,
            }));
        }

        return response.banks
    } catch {
        toast.error('Houve um erro ao buscar os bancos');
        return [];
    }
}

/**
 * @deprecated All Rest APIs are now deprecated, use Graphql instead
 */
export const getIndexerTypes = async (): Promise<any[]> => {
    try {
        const response: GetIndexerTypesResponse = await getFinanceData(URL_FINANCE_INDEXER_TYPE);
        return response.indexerTypes.map((i: IndexerType) => ({
            value: i.indexerTypeId,
            label: i.indexerTypeName,
        }));
    } catch {
        toast.error('Houve um erro ao buscar os cartões de crédito');
        return [];
    }
};

/**
 * @deprecated All Rest APIs are now deprecated, use Graphql instead
 */
export const getIndexers = async (selectFormat: boolean): Promise<any[]> => {
    try {
        const response: GetIndexersResponse = await getFinanceData(URL_FINANCE_INDEXER);

        if (selectFormat) {
            return response.indexers.map((i: Indexer) => ({
                value: i.indexerId,
                label: i.indexerName,
            }));
        }

        return response.indexers;
    } catch {
        toast.error('Houve um erro ao buscar os cartões de crédito');
        return [];
    }
};

// export const getCurrencies = async (): Promise<any[]> => {
//     try {
//         const response: GetCurrencyResponse = await getFinanceData(URL_FINANCE_CURRENCY);
//         return response.currencies.map((i: Currency) => (
//             {value: i.currencyId, label: i.symbol}
//         ));
//     } catch {
//         toast.error('Houve um erro ao buscar as moedas');
//         return [];
//     }
// };

/**
 * @deprecated All Rest APIs are now deprecated, use Graphql instead
 */
export const getLiquidity = async (): Promise<any[]> => {
    try {
        const response: GetLiquidityResponse = await getFinanceData(URL_FINANCE_LIQUIDITY);
        return response.liquidity.map((i: Liquidity) => (
            {value: i.liquidityId, label: i.liquidityName}
        ));
    } catch {
        toast.error('Houve um erro ao buscar as moedas');
        return [];
    }
};

// export const getTaxFee = async (countryId: string, taxFeeType: string): Promise<any[]> => {
//     try {
//         const response: GetTaxFeeResponse = await getFinanceData(URL_FINANCE_TAX_FEE, {countryId: countryId, type: taxFeeType});
//         return response.taxFee.map((i: TaxFee) => (
//             {value: i.taxFeeId, label: i.name}
//         ))
//     } catch {
//         toast.error('Houve um erro ao buscar as taxas e impostos')
//         return []
//     }
// };


/**
 * @deprecated All Rest APIs are now deprecated, use Graphql instead
 */
export const getBrazilianFunds = async (selectFormat: boolean): Promise<any[]> => {
    try {
        const response: GetBrazilianFundResponse = await getFinanceData(URL_FINANCE_BRAZILIAN_FUNDS);
        if (selectFormat) {
            return response.funds.map((i: BrazilianFunds) => ({
                value: i.fundId,
                label: i.name,
            }));
        }

        return response.funds;
    } catch {
        toast.error('Houve um erro ao buscar os fundos de investimentos');
        return [];
    }
};

/**
 * @deprecated All Rest APIs are now deprecated, use Graphql instead
 */
export const getCategories = async (selectFormat: boolean): Promise<any[]> => {
    try {
        const response: GetCategoryResponse = await getFinanceData(URL_FINANCE_CATEGORIES);
        if (selectFormat) {
            return response.categories.map((i: Category) =>
                ({value: i.categoryId, label: i.name})
            );
        }
        return response.categories
    } catch {
        // toast.error('Houve um erro ao buscar as categorias' + err);
        return [];
    }
};

import {getFinanceData} from "../axios/Get.tsx";
import {GetAccountResponse, GetCategoryResponse, GetCreditCardsResponse, GetCurrencyResponse, GetIndexersResponse, GetIndexerTypesResponse, GetInvestmentTypesResponse, GetLiquidityResponse} from "../../interfaces/FinanceRequest.tsx";
import {Account, Category, CreditCard, Currency, Indexer, IndexerType, InvestmentType, Liquidity} from "../../interfaces/Finance.tsx";
import {URL_CATEGORIES, URL_FINANCE_ACCOUNT, URL_FINANCE_CREDIT_CARD, URL_FINANCE_CURRENCY, URL_FINANCE_INDEXER, URL_FINANCE_INDEXER_TYPE, URL_FINANCE_INVESTMENT_TYPE, URL_FINANCE_LIQUIDITY} from "../axios/ApiUrls.tsx";


export const getAccounts = async () => {
    try {
        const response: GetAccountResponse = await getFinanceData(URL_FINANCE_ACCOUNT);
        return response.accounts.map((i: Account) => ({
            value: i.accountId,
            label: i.nickname
        }))
    } catch {
        return [];
    }
}

// Credit cards
export const getCreditCards = async (): Promise<any[]> => {
    try {
        const response: GetCreditCardsResponse = await getFinanceData(URL_FINANCE_CREDIT_CARD);
        return response.creditCards.map((i: CreditCard) => ({
            value: i.creditCardId,
            label: i.nickname,
        }));
    } catch {
        // toast.error('Houve um erro ao buscar os cartões de crédito');
        return [];
    }
};

// Investments
export const getInvestmentTypes = async (): Promise<any[]> => {
    try {
        const response: GetInvestmentTypesResponse = await getFinanceData(URL_FINANCE_INVESTMENT_TYPE);
        return response.investmentTypes.map((i: InvestmentType) => ({
            value: i.investmentTypeId,
            label: i.investmentTypeName,
        }));
    } catch {
        // toast.error('Houve um erro ao buscar os cartões de crédito');
        return [];
    }
};

//Finance
export const getIndexerTypes = async (): Promise<any[]> => {
    try {
        const response: GetIndexerTypesResponse = await getFinanceData(URL_FINANCE_INDEXER_TYPE);
        return response.indexerTypes.map((i: IndexerType) => ({
            value: i.indexerTypeId,
            label: i.indexerTypeName,
        }));
    } catch {
        // toast.error('Houve um erro ao buscar os cartões de crédito');
        return [];
    }
};

export const getIndexers = async (): Promise<any[]> => {
    try {
        const response: GetIndexersResponse = await getFinanceData(URL_FINANCE_INDEXER);
        return response.indexers.map((i: Indexer) => ({
            value: i.indexerId,
            label: i.indexerName,
        }));
    } catch {
        // toast.error('Houve um erro ao buscar os cartões de crédito');
        return [];
    }
};

export const getCurrencies = async (): Promise<any[]> => {
    try {
        const response: GetCurrencyResponse = await getFinanceData(URL_FINANCE_CURRENCY);
        return response.currencies.map((i: Currency) => (
            {value: i.currencyId, label: i.symbol}
        ));
    } catch {
        // toast.error('Houve um erro ao buscar as moedas');
        return [];
    }
};

export const getLiquidity = async (): Promise<any[]> => {
    try {
        const response: GetLiquidityResponse = await getFinanceData(URL_FINANCE_LIQUIDITY);
        return response.liquidity.map((i: Liquidity) => (
            {value: i.liquidityId, label: i.liquidityName}
        ));
    } catch {
        // toast.error('Houve um erro ao buscar as moedas');
        return [];
    }
};

// Other
export const getCategories = async (): Promise<any[]> => {
    try {
        const response: GetCategoryResponse = await getFinanceData(URL_CATEGORIES);
        return response.categories.map((i: Category) =>
            ({value: i.categoryId, label: i.name})
        );
    } catch {
        // toast.error('Houve um erro ao buscar as categorias' + err);
        return [];
    }
};

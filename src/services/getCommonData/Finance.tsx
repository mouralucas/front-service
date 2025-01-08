import {getFinanceData} from "../axios/Get.tsx";
import {GetAccountResponse, GetCreditCardsResponse, GetCurrencyResponse, GetInvestmentTypesResponse} from "./FinanceInterfaces.tsx";
import {Account, CreditCard, Currency, InvestmentType} from "../../pages/finance/Interfaces.tsx";
import {URL_FINANCE_ACCOUNT, URL_FINANCE_CREDIT_CARD, URL_FINANCE_CURRENCY, URL_FINANCE_INVESTMENT_TYPE} from "../axios/ApiUrls.tsx";


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

// Other
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
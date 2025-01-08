import {Account, CreditCard, Currency, InvestmentType} from "../../pages/finance/Interfaces.tsx";


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

// Other
export interface GetCurrencyResponse {
    quantity: number;
    currencies: Currency[];
}

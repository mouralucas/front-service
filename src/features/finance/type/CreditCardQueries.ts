import { CreditCard } from "./CreditCard";

export interface GetCreditCardsQuery {
    getCreditCards: {
        creditCards: CreditCard[];
    };
}
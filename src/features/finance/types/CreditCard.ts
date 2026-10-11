export interface CreditCard {
    creditCardId: string;
    active: boolean;
    ownerId: string;
    nickname: string;
    accountId: string;
    currencyId: string;
    issueDate: string;
    cancellationDate: string;
    dueDay: number;
    closeDay: number;
}
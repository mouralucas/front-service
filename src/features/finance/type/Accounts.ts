export interface Account {
    accountId: string;
    nickname: string;
    currencyId: string;
    currencySymbol: string;
    branch: string;
    number: string;
    openAt: string;
    closeAt: string;
}

export interface AccountTransaction {
    transactionId?: number | null;
    ownerId: string;
    accountId: string;
    accountNickname: string;
    period: number;
    currencyId: string;
    currencySymbol: string;
    amount: number;
    transactionDate: string;
    categoryId: string;
    description: string | undefined;
    transactionCurrencyId: string;
    exchangeRate: number | null;
    taxPerc: number | null;
    tax: number | null;
    spreadPerc: number | null;
    spread: number | null;
    effectiveRate: number | null;
    createdAt: Date | null;
    lastEditedAt: Date | null;
}
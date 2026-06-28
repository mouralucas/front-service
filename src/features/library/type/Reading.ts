
export interface ItemReading {
    readingId: string | null;
    itemId: number;
    startDate: string;
    finishDate: string | null;
    isDropped: boolean;
}

export interface ItemReadingProgress {
    readingId: string;
    progressType: string | null;
    value: number;
    progressDate: string;
    rate: number | undefined;
    comment: string | undefined;
}
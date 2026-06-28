

export interface ItemSummary {
    id: number;
    title: string;
    cover: string;
    mainAuthorId: number;
    mainAuthorName: string;
    readingGoalId: string;
    readingGoalYear?: number;
    readingGoalAchieved: boolean;
    readingGoalDateAchieved: string;
    readingId: string;
    readingStartDate: string;
    lastPage: number;
    lastPercentage: number;
}

export interface ItemReadingStats {
    readingsCount: number;
    lastReadingDate: string | null;
    isCurrentlyReading: boolean;
    currentReadingId: string | null;
    currentPage: number | null;
    currentPercentage: number | null;
}






export interface ItemReadingGoal {
    id: string;
    item: Item;
    year: number;
    acheived: boolean;
    dateAcheived?: string;
}

export interface Author {
    id?: string | null
    name: string
    birthDate?: string | null
    languageId?: string
    languageName?: string
    countryId?: string
    countryName?: string
    description?: string
}

export interface Serie {
    id?: number | null;
    name: string;
    originalName: string;
    description: string;
    countryId: string | null;
}

export interface Collection {
    id: string | null
    name: string
    description: string
}

export interface Publisher {
    publisherId: string
    publisherName: string
}

export interface LastStatus {
    statusId?: string
    name?: string
    description?: string
    order?: number
    image?: string
    itemType?: string
}
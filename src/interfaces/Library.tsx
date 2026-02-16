export interface Item {
    id?: number | null
    lastStatusId: string | null
    lastStatusDate: string
    lastStatusName?: string | null
    mainAuthorId: number | null;
    mainAuthorName: string;
    authorsId?: number[]
    translatorId?: number
    title: string
    subtitle?: string
    titleOriginal?: string
    subtitleOriginal?: string
    isbn?: string
    isbn10?: string
    itemTypeId: string
    pages?: number
    volume?: number 
    publicationDate: string | null
    originalPublicationDate: string | null
    serieId: number
    serieName: string
    collectionId: number
    publisherId: number | null
    publisherName: string
    formatId: string;
    languageId: 'PT'
    coverPrice: number
    paidPrice: number
    cover: string
    summary?: string
    observation?: string
    createdBy?: string | null
    createdAt?: Date | null
    locationId: number
    lastEditedBy?: string | null
    lastEditedAt?: Date | null
}

export type CreateItemInput = Omit<
  Item,
  "lastStatusName" | "mainAuthorName" | "serieName" | "publisherName" | "createdBy" | "createdAt" | "lastEditedBy" | "lastEditedAt" | "period" | "ownerId"
>;


export interface ItemReadingStats {
    readingsCount: number;
    lastReadingDate: string | null;
    isCurrentlyReading: boolean;
    currentReadingId: string | null;
    currentPage: number | null;
    currentPercentage: number | null;
}


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
    serieId: string;
    serieName: string;
    originalName: string;
    description: string;
    countryId: string;
}

export interface Collection {
    collectionId: string
    collectionName: string
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
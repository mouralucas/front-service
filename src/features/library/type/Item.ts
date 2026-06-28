export interface Item {
    id?: number | null
    lastStatusId: string | null
    lastStatusDate: string
    lastStatusName?: string | null
    mainAuthorId: number | null;
    mainAuthorName: string;
    authorsIds?: number[]
    authorsNames?: string[]
    translatorId?: number
    title: string
    subtitle?: string
    titleOriginal?: string
    subtitleOriginal?: string
    isbn?: string
    itemTypeId: string
    pages?: number
    volume?: number 
    publicationDate: string | null
    originalPublicationDate: string | null
    serieId: number
    serieName: string
    collectionId: number
    collectionName: string
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
    isInReadingQueue: boolean
    lastEditedBy?: string | null
    lastEditedAt?: Date | null
}

export type CreateItemInput = Omit<
  Item,
  "lastStatusName" | "mainAuthorName" | "serieName" | "collectionName" | "publisherName" | "createdBy" | "createdAt" | "lastEditedBy" | "lastEditedAt" | "period" | "ownerId" | "isInReadingQueue"
>;
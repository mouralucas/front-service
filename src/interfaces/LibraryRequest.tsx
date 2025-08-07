import {Author, Collection, ItemReadingStats, LastStatus, Publisher, Serie} from "./Library.tsx";


export interface GetAuthorsResponse {
    quantity: number;
    authors: Author[];
}

export interface GetStatusResponse {
    statuses: LastStatus[]
}

export interface PublisherResponse {
    publishers: Publisher[]
}

export interface SeriesResponse {
    series: Serie[]
}

export interface CollectionResponse {
    collections: Collection[]
}

export interface ReadingStatsResponse {
    stats: ItemReadingStats;
}



import {getLibraryData} from "../axios/Get.tsx";
import {URL_LIBRARY_AUTHOR, URL_LIBRARY_COLLECTION, URL_LIBRARY_ITEM, URL_LIBRARY_PUBLISHER, URL_LIBRARY_SERIE, URL_LIBRARY_STATUS} from "../axios/ApiUrls.tsx";
import {toast} from "react-toastify";
import {CollectionResponse, GetAuthorsResponse, GetStatusResponse, PublisherResponse, SeriesResponse} from "../../interfaces/LibraryRequest.tsx";
import {Author, Collection, LastStatus, Publisher, Serie} from "../../interfaces/Library.tsx";


export const getItems = async (itemType: string) => {
    try {
        const response = await getLibraryData(URL_LIBRARY_ITEM, {itemType: itemType});
        return response.items
    } catch {
        toast.error('Houve um erro ao buscar os itens')
        return [];
    }
}


export const getAuthors = async (selectFormat: boolean) => {
    try {
        const response: GetAuthorsResponse = await getLibraryData(URL_LIBRARY_AUTHOR);
        if (selectFormat) {
            return response.authors.map((i: Author) => (
                {value: i.authorId, label: i.authorName}
            ));
        }

        return response.authors
    } catch {
        toast.error('Houve um erro ao buscar os autores');
        return []
    }
}


export const getStatuses = async (itemType: string, selectFormat: boolean) => {
    try {
        const response: GetStatusResponse = await getLibraryData(URL_LIBRARY_STATUS, {itemType: itemType});
        if (selectFormat) {
            return response.statuses.map((i: LastStatus) => (
                {value: i.statusId, label: i.name}
            ));
        }

        return response.statuses
    } catch {
        toast.error('Houve um erro ao buscar os status de itens');
        return []
    }
}

export const getSeries = async (selectFormat: boolean) => {
    try {
        const response: SeriesResponse = await getLibraryData(URL_LIBRARY_SERIE);
        if (selectFormat) {
            return response.series.map((i: Serie) => (
                {value: i.serieId, label: i.serieName}
            ));
        }

        return response.series
    } catch {
        toast.error('Houve um erro ao buscar as séries');
        return []
    }
}

export const getCollections = async (selectFormat: boolean) => {
    try {
        const response: CollectionResponse = await getLibraryData(URL_LIBRARY_COLLECTION);
        if (selectFormat) {
            return response.collections.map((i: Collection) => (
                {value: i.collectionId, label: i.collectionName}
            ));
        }

        return response.collections
    } catch {
        toast.error('Houve um erro ao buscar as coleções');
        return []
    }
}

export const getPublishers = async (selectFormat: boolean) => {
    try {
        const response: PublisherResponse = await getLibraryData(URL_LIBRARY_PUBLISHER);
        if (selectFormat) {
            return response.publishers.map((i: Publisher) => (
                {value: i.publisherId, label: i.publisherName}
            ));
        }

        return response.publishers
    } catch {
        toast.error('Houve um erro ao buscar as editoras');
        return []
    }
}
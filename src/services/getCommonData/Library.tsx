import { toast } from "react-toastify";
import { Author, Collection, Publisher, Serie } from "../../types/Library.tsx";
import { CollectionResponse, GetAuthorsResponse, PublisherResponse, SeriesResponse } from "../../types/LibraryRequest.tsx";
import { URL_LIBRARY_AUTHOR, URL_LIBRARY_COLLECTION, URL_LIBRARY_PUBLISHER, URL_LIBRARY_SERIE } from "../axios/ApiUrls.tsx";
import { getLibraryData } from "../axios/Get.tsx";


export const getAuthors = async (selectFormat: boolean) => {
    try {
        const response: GetAuthorsResponse = await getLibraryData(URL_LIBRARY_AUTHOR);
        if (selectFormat) {
            return response.authors.map((i: Author) => (
                {value: i.id, label: i.name}
            ));
        }

        return response.authors
    } catch {
        toast.error('Houve um erro ao buscar os autores');
        return []
    }
}

export const getSeries = async (selectFormat: boolean) => {
    try {
        const response: SeriesResponse = await getLibraryData(URL_LIBRARY_SERIE);
        if (selectFormat) {
            return response.series.map((i: Serie) => (
                {value: i.id, label: i.name}
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
                {value: i.id, label: i.name}
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
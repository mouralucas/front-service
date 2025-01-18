import {GetCountryResponse, GetLanguageResponse} from "../../interfaces/CoreRequest.tsx";
import {getFinanceData, getLibraryData} from "../axios/Get.tsx";
import {URL_COUNTRY, URL_LANGUAGE} from "../axios/ApiUrls.tsx";
import {Country, Language} from "../../interfaces/Core.tsx";
import {toast} from "react-toastify";

export const getCountries = async (): Promise<any[]> => {
    try {
        const response: GetCountryResponse = await getFinanceData(URL_COUNTRY);
        return response.countries.map((i: Country) => ({
            value: i.countryId,
            label: i.countryName,
        }));
    } catch {
        toast.error('Houve um erro ao buscar os cartões de crédito');
        return [];
    }
};

export const getLanguages = async (selectFormat: boolean) => {
    try {
        const response: GetLanguageResponse = await getLibraryData(URL_LANGUAGE);
        if (selectFormat) {
            return response.languages.map((i: Language) => (
                {value: i.languageId, label: i.languageName}
            ));
        }

        return response.languages
    } catch {
        toast.error('Houve um erro ao buscar os idiomas');
        return []
    }
}
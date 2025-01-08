import {GetCountryResponse} from "../../interfaces/CoreRequest.ts";
import {getFinanceData} from "../axios/Get.tsx";
import {URL_COUNTRY} from "../axios/ApiUrls.tsx";
import {Country} from "../../interfaces/Core.tsx";
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
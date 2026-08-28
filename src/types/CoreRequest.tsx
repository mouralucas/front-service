import {Country, Language} from "./Core.tsx";

export interface GetCountryResponse {
    quantity: number;
    countries: Country[];
}

export interface GetLanguageResponse {
    quantity: number;
    languages: Language[];
}
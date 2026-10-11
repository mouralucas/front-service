import financeAxios from "../../services/axios/FinanceServiceAxios"
import libraryAxios from "./LibraryServiceAxios.tsx"
import sportsDataAxios from "./SportsDataAxios.ts"


const getFinanceData = async (url: string, params: any = null) => {
    let response: any;

    try {
        response = await financeAxios.get(url, { params: params });
    } catch {
        response = null
    }
    return response?.data
}

const getLibraryData = async (url: string, params: any = null) => {
    let response: any;

    try {
        response = await libraryAxios.get(url, { params: params });
    } catch {
        response = null
    }
    return response?.data
}

const getSportsData = async (url: string, params: any = null) => {
    let response: any;

    try {
        response = await sportsDataAxios.get(url, { params: params });
    } catch {
        response = null
    }
    return response?.data
}

export { getFinanceData, getLibraryData, getSportsData };
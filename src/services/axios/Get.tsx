import financeAxios from "../../services/axios/FinanceServiceAxios"
import userAxios from "../../services/axios/UserServiceAxios"
import libraryAxios from "../../services/axios/LibraryServiceAxios"

const getUserData = async (url: string, params: any = null) => {
    let response;

    try {
        response = await userAxios.get(url, {params: params});
    } catch {
        response = null;
    }

    return response;

}

const getFinanceData = async (url: string, params: any = null) => {
    let response: any;

    try {
        response = await financeAxios.get(url, {params: params});
    } catch {
        response = null
    }
    return response?.data
}

const getLibraryData = async (url: string, params: any = null) => {
    let response: any;

    try {
        response = await libraryAxios.get(url, {params: params});
    } catch {
        response = null
    }
    return response?.data
}

export {getFinanceData, getLibraryData, getUserData};
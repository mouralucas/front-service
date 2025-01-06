import financeAxios from "../../services/axios/FinanceServiceAxios"
import userAxios from "../../services/axios/UserServiceAxios"

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

export {getFinanceData, getUserData};
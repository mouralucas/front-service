import financeAxios from "../../services/axios/FinanceServiceAxios"

const getFinanceData = async (url: string, params: any = null) => {
    let response: any;

    try {
        response = await financeAxios.get(url, {params: params});
    } catch {
        response = null
    }
    return response?.data
}

export {getFinanceData};
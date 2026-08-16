import { AxiosInstance } from "axios";
import { URL_USER_BASE } from "../../../services/baseUrl.tsx";
import { createAxiosInstance } from "../../../services/axios/axiosConfig.tsx";

const user_connections_instance: AxiosInstance = createAxiosInstance(URL_USER_BASE);


const userSubmit = async (
    e: any,
    url: string,
    values: any,
    method: string
) => {
    e.preventDefault();

    const response = await user_connections_instance({
        method: method,
        url: url,
        data: values,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response?.data
}

export default userSubmit;
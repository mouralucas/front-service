import axios, {AxiosInstance} from "axios";
import {getToken} from "../auth/Auth.tsx";
import {URL_FINANCE_BASE} from "./ApiUrls.tsx";

const finance_connections_instance: AxiosInstance = axios.create(
    {
        baseURL: URL_FINANCE_BASE
    }
);

finance_connections_instance.interceptors.request.use(async config => {
    const token: string | null = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

finance_connections_instance.interceptors.response.use(
    async function (response: any) {
        return response;
    },
    async function (error: any) {
        // TODO: revisar status code pra limpar o localStorage
        if (error.response.status === 401 && getToken()) {
            localStorage.clear();
        } else {
            console.error('Error', error);
        }
        return Promise.reject(error);
    }
);

export default finance_connections_instance
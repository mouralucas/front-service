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

let isRedirecting = false;

finance_connections_instance.interceptors.response.use(
    async function (response: any) {
        return response;
    },
    async function (error: { response: { status: number; }; }) {
        console.log('Error: ' + error.response?.status);
        if (error.response?.status === 401) {
            if (!isRedirecting) {
                isRedirecting = true;
                // Limpa os dados do usuário
                localStorage.clear();

                const currentPath = encodeURIComponent(window.location.pathname + window.location.search);
                window.location.href = `/login?from=${currentPath}`;
            }
        }
        return Promise.reject(error);
    }
);

export default finance_connections_instance
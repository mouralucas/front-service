import axios, {AxiosInstance} from "axios";
import {getToken} from "../auth/Auth.tsx";
import {URL_LIBRARY_BASE} from "./ApiUrls.tsx";

const library_connections_instance: AxiosInstance = axios.create(
    {
        baseURL: URL_LIBRARY_BASE
    }
);

library_connections_instance.interceptors.request.use(async config => {
    const token: string | null = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

let isRedirecting = false;

library_connections_instance.interceptors.response.use(
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
                // Redireciona para a página de login
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default library_connections_instance
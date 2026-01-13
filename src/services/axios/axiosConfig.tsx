import axios, { AxiosInstance } from "axios";
import { getToken } from "../auth/Auth.tsx";
import { refreshAccessToken } from "../auth/RefreshToken.tsx";

let isRedirecting = false;

export const createAxiosInstance = (baseURL: string): AxiosInstance => {
    const instance: AxiosInstance = axios.create({
        baseURL
    });

    instance.interceptors.request.use(async config => {
        const token: string | null = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    instance.interceptors.response.use(
        async function (response: any) {
            return response;
        },
        async function (error: { response: { status: number; }; config: any }) {
            if (error.response?.status === 401) {
                const originalRequest = error.config;

                if (!originalRequest._retry) {
                    originalRequest._retry = true;

                    const refreshed = await refreshAccessToken() !== null;
                    if (refreshed) {
                        const token = getToken();
                        if (token) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            return instance(originalRequest);
                        }
                    }
                }

                if (!isRedirecting) {
                    isRedirecting = true;
                    localStorage.clear();

                    const currentPath = encodeURIComponent(window.location.pathname + window.location.search);
                    window.location.href = `/login?from=${currentPath}`;
                }
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

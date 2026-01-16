import axios, { AxiosInstance, AxiosError } from "axios";
import { getToken } from "../auth/Auth.tsx";
import { refreshAccessToken } from "../auth/RefreshToken.tsx";

let isRedirecting = false;
let refreshPromise: Promise<boolean> | null = null;

const redirectToLogin = () => {
    if (isRedirecting) return;

    isRedirecting = true;
    localStorage.clear();

    const currentPath = encodeURIComponent(
        window.location.pathname + window.location.search
    );

    window.location.href = `/login?from=${currentPath}`;
};

export const createAxiosInstance = (baseURL: string): AxiosInstance => {
    const instance = axios.create({ baseURL });

    // 🔐 Request interceptor
    instance.interceptors.request.use(config => {
        const token = getToken();
        if (token) {
            config.headers?.set("Authorization", `Bearer ${token}`);
        }
        return config;
    });

    // 🚨 Response interceptor
    instance.interceptors.response.use(
        response => response,
        async (error: AxiosError) => {
            const status = error.response?.status;
            const originalRequest: any = error.config;

            if (status === 401 && originalRequest) {
                // 🔒 Evita loop infinito
                if (originalRequest._alreadyTriedRefresh) {
                    redirectToLogin();
                    return Promise.reject(error);
                }

                originalRequest._alreadyTriedRefresh = true;

                if (!refreshPromise) {
                    refreshPromise = refreshAccessToken()
                        .then(result => {
                            refreshPromise = null;
                            return result !== null;
                        })
                        .catch(() => {
                            refreshPromise = null;
                            return false;
                        });
                }

                const refreshed = await refreshPromise;

                if (!refreshed) {
                    redirectToLogin();
                    return Promise.reject(error);
                }

                const newToken = getToken();
                if (newToken) {
                    originalRequest.headers.set(
                        "Authorization",
                        `Bearer ${newToken}`
                    );
                }

                return instance(originalRequest);
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

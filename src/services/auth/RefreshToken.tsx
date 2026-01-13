import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, STORAGE_TYPE, setToken} from "./Auth";
import { URL_USER_BASE } from "../baseUrl";

const URL_REFRESH = `${URL_USER_BASE}/login/refresh`;

export const getRefreshToken = (): string | null => STORAGE_TYPE.getItem(REFRESH_TOKEN_KEY);

export const clearTokens = () => {
    STORAGE_TYPE.removeItem(ACCESS_TOKEN_KEY);
    STORAGE_TYPE.removeItem(REFRESH_TOKEN_KEY);
};

export async function refreshAccessToken(): Promise<{ accessToken?: string; refreshToken?: string } | null> {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;

    try {
        const res = await fetch(URL_REFRESH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({refreshToken})
        });

        if (!res.ok) {
            // refresh failed
            clearTokens();
            return null;
        }

        const data = await res.json();

        // Expected shape: { accessToken: string, refreshToken?: string }
        if (data.tokenPair) {
            setToken('access', data.tokenPair.accessToken);
            console.log(data.tokenPair.accessToken);
            setToken('refresh', data.tokenPair.refreshToken);
        }

        return {accessToken: data.tokenPair.accessToken, refreshToken: data.tokenPair.refreshToken};
    } catch (error) {
        console.error('refreshAccessToken error', error);
        return null;
    }
}

export default refreshAccessToken;

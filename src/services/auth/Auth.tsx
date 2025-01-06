export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';
export const STORAGE_TYPE: Storage = localStorage;

export const isAuthenticated = (): boolean => {

    return STORAGE_TYPE.getItem(ACCESS_TOKEN_KEY) !== null

};

export const getToken = (): string | null => STORAGE_TYPE.getItem(ACCESS_TOKEN_KEY);


export const setToken = (tokenType: string, token: string) => {
    if (tokenType === 'access') {
        STORAGE_TYPE.setItem(ACCESS_TOKEN_KEY, token);
    }

    if (tokenType === 'refresh') {
        STORAGE_TYPE.setItem(REFRESH_TOKEN_KEY, token);
    }
};


export const logout = () => {
    STORAGE_TYPE.removeItem(ACCESS_TOKEN_KEY);
};
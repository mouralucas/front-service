import {Navigate, useLocation} from "react-router-dom";

export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';
export const STORAGE_TYPE: Storage = localStorage;

export const isAuthenticated = (): boolean => STORAGE_TYPE.getItem(ACCESS_TOKEN_KEY) !== null;
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

const RequireAuth = ({children}: { children: never }) => {
    const location = useLocation();

    if (!isAuthenticated()) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they log in, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{from: location}}/>;
    }

    return children;
}

export default RequireAuth;
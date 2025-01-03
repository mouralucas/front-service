import {Navigate, useLocation} from "react-router-dom";

export const TOKEN_KEY = 'userToken';
export const STORAGE_TYPE: Storage = localStorage;

export const isAuthenticated = (): boolean => STORAGE_TYPE.getItem(TOKEN_KEY) !== null;
export const getToken = (): string | null => STORAGE_TYPE.getItem(TOKEN_KEY);

export const setToken = (token: string) => {
    STORAGE_TYPE.setItem(TOKEN_KEY, token);
};

export const logout = () => {
    STORAGE_TYPE.removeItem(TOKEN_KEY);
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
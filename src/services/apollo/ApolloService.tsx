// apolloFinanceClient.ts
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getToken } from "../auth/Auth";

let isRedirecting = false;

export const authLink = setContext((_, { headers }) => {
    const token: string | null = getToken();
    return {
        headers: {
            ...headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    };
});

export const errorLink = onError(({ networkError }) => {
    if (
        networkError &&
        "statusCode" in networkError &&
        networkError.statusCode === 401
    ) {
        if (!isRedirecting) {
            isRedirecting = true;
            localStorage.clear();

            const currentPath = encodeURIComponent(
                window.location.pathname + window.location.search
            );
            window.location.href = `/login?from=${currentPath}`;
        }
    }
});


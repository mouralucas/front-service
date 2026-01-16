import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { fromPromise } from "@apollo/client/link/utils";
import { Observable } from "zen-observable-ts";
import { getToken } from "../../auth/Auth";
import { refreshAccessToken } from "../../auth/RefreshToken";

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

const authLink = setContext((_, { headers }) => {
    const token = getToken();

    return {
        headers: {
            ...headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    };
});

const errorLink = onError(({ networkError, operation, forward }) => {
    const statusCode =
        networkError &&
        "statusCode" in networkError &&
        networkError.statusCode;

    if (statusCode === 401) {
        // 🔒 Proteção contra loop infinito
        if (operation.getContext().alreadyTriedRefresh) {
            redirectToLogin();
            return new Observable(observer => observer.complete());
        }

        operation.setContext({ alreadyTriedRefresh: true });

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

        return fromPromise(refreshPromise).flatMap(refreshed => {
            if (!refreshed) {
                redirectToLogin();
                return new Observable(observer => observer.complete());
            }

            const newToken = getToken();
            operation.setContext(({ headers = {} }) => ({
                headers: {
                    ...headers,
                    Authorization: `Bearer ${newToken}`,
                },
            }));

            return forward(operation);
        });
    }

    return;
});

export const createApolloClient = (uri: string): ApolloClient<any> => {
    const httpLink = new HttpLink({ uri });

    return new ApolloClient({
        link: from([authLink, errorLink, httpLink]),
        cache: new InMemoryCache(),
    });
};

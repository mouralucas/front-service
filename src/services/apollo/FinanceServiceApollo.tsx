// apolloFinanceClient.ts
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { FINANCE_GRAPHQL_BASE_URL } from "./GraphQLUrls";
import { getToken } from "../auth/Auth";

let isRedirecting = false;

const authLink = setContext((_, { headers }) => {
  const token: string | null = getToken();
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

const errorLink = onError(({ networkError }) => {
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


const httpLink = new HttpLink({
  uri: FINANCE_GRAPHQL_BASE_URL,
});

export const apolloFinanceClient = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

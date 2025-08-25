import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { authLink, errorLink } from "./ApolloService";
import { FINANCE_GRAPHQL_BASE_URL } from "../GraphQLUrls";


const httpLink = new HttpLink({
  uri: FINANCE_GRAPHQL_BASE_URL,
});

export const apolloFinanceClient = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

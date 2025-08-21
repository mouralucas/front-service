import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { FINANCE_GRAPHQL_BASE_URL } from './GraphQLUrls'

export const apolloFinanceClient = new ApolloClient({
  link: new HttpLink({
    uri: FINANCE_GRAPHQL_BASE_URL,
  }),
  cache: new InMemoryCache(),
});
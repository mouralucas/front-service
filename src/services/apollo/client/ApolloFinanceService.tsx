import { createApolloClient } from "./ApolloService";
import { FINANCE_GRAPHQL_BASE_URL } from "../GraphQLUrls";

export const apolloFinanceClient = createApolloClient(FINANCE_GRAPHQL_BASE_URL);

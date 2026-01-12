import { createApolloClient } from "./ApolloService";
import { LIBRARY_GRAPHQL_BASE_URL } from "../GraphQLUrls";

export const apolloLibraryClient = createApolloClient(LIBRARY_GRAPHQL_BASE_URL);

// UserService.ts
import { gql } from "@apollo/client";
import { apolloFinanceClient } from "../apollo/ApolloFinanceService";

export class FinanceGraphQLService {
    static async getHelloWorldFinance(query: string) {
        const query_ = gql`${query}`
        const { data } = await apolloFinanceClient.query({
            query: query_,
        });

        return data.getIndexerSeries.series;
    }

    // Example: create a user
    static async createUser(name: string, email: string) {
        const CREATE_USER = gql`
      mutation CreateUser($name: String!, $email: String!) {
        createUser(name: $name, email: $email) {
          id
          name
          email
        }
      }
    `;

        const { data } = await apolloFinanceClient.mutate({
            mutation: CREATE_USER,
            variables: { name, email },
        });

        return data.createUser;
    }
}

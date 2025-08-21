// UserService.ts
import { gql } from "@apollo/client";
import { apolloFinanceClient } from "../apollo/FinanceServiceApollo";

export class UserService {
    static async helloWorldFinance() {
        const GET_USER = gql`
            query helloWorld {
                helloWorld
            }
        `;

        const { data } = await apolloFinanceClient.query({
            query: GET_USER,
        });

        return data;
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

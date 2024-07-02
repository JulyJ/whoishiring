import { ApolloClient, InMemoryCache } from "@apollo/client";

const graphqlClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI!,
    cache: new InMemoryCache(),
});

export default graphqlClient;

import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hello GraphQL world!👋",
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server
    .listen({
        port: 9000,
    })
    .then(({ url }) => {
        console.log(`Server is running on ${url}`);
    });

const typeDefs = `#graphql
    type Job {
        id: ID!
        title: String!
        company: String!
        location: String!
        description: String!
    }

    type Query {
        jobs: [Job]
    }
`;

export default typeDefs;

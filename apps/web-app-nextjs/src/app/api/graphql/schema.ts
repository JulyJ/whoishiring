import { GraphQLScalarType, Kind } from "graphql";

export const UnixTimestamp = new GraphQLScalarType({
    name: "UnixTimestamp",
    description: "Unix timestamp in seconds",

    serialize(value) {
        if (value instanceof Date) {
            return Math.floor(value.getTime() / 1000);
        }
        return null;
    },

    parseValue(value) {
        if (typeof value === "number") {
            return new Date(value * 1000);
        }
        return null;
    },

    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10) * 1000);
        }
        return null;
    },
});

const typeDefs = `#graphql
    scalar UnixTimestamp

    type OriginalJob {
        _id: ID!
        time: UnixTimestamp,
        id: String,
        threadId: String,
        title: String,
        date: String,
        author: String,
        text: String,
        urls: [String],
        hasRemote: Boolean,
        hasQA: Boolean,
        hasFrontend: Boolean
    }

    type Job {
        _id: ID!
        jobTitle: String
        jobDescription: String
        company: String
        location: String
        contact: String
        notes: String
        parsedUrls: [String]
        tags: [String]
        created: UnixTimestamp
        threadId: String
        author: String
        date: String
        urls: [String]
        hasRemote: Boolean
        hasQA: Boolean
        hasFrontend: Boolean

        original: OriginalJob
    }

    type Query {
        jobs: [Job]
    }
`;

export default typeDefs;

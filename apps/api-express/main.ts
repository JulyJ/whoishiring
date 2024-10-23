import { ApolloServer } from "npm:@apollo/server";
import { startStandaloneServer } from "npm:@apollo/server/standalone";
import { resolvers } from "./src/resolvers.ts";
import gql from "npm:graphql-tag";
import { ListingsAPI } from "./src/data-sources/listings-api.ts";
import mongoose from "npm:mongoose";
import { JobPostingsMongoDataSource } from "./src/data-sources/job-postings-mongo.ts";

const typeDefs = gql.gql(Deno.readTextFileSync("./src/schema.graphql"));

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const connectToMongo = async () => {
    const mongoConnectionString = Deno.env.get("MONGO_DB_URI");
    if (!mongoConnectionString) {
        throw new Error("MONGO_DB_URI environment variable is not set");
    }

    try {
        await mongoose.connect(mongoConnectionString, {});
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        Deno.exit(1);
    }
};

await connectToMongo();

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => {
        const { cache } = server;

        return {
            dataSources: {
                listingsAPI: new ListingsAPI({ cache }),
                jobPostingsMongo: new JobPostingsMongoDataSource(Deno.env.get("MONGO_DB_PARSED_JOBS_COLLECTION")!),
            },
        };
    },
});

console.log(`🚀  Server ready at: ${url}`);

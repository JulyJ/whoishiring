import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import typeDefs from "./schema";
import resolvers from "./resolvers";

import mongoose from "mongoose";
import JobsDataSource from "../datasources/jobs.datasource";

interface Context {
    dataSources: {
        jobs: JobsDataSource;
    };
}

const uri = process.env.MONGODB_URI;
const db = process.env.MONGODB_DB;

const connectDB = async () => {
    try {
        if (uri) {
            await mongoose.connect(`${uri}${db}`);
            console.log("MongoDB Connected...");
        }
    } catch (error) {
        console.error(error);
    }
};

connectDB();

const server = new ApolloServer<Context>({
    resolvers,
    typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
    context: async (req, res) => ({
        req,
        res,
        dataSources: {
            jobs: new JobsDataSource(),
        },
    }),
});
export async function GET(request: NextRequest) {
    return handler(request);
}
export async function POST(request: NextRequest) {
    return handler(request);
}

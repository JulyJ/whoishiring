import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import typeDefs from "./schema";
import resolvers from "./resolvers";

import mongoose from "mongoose";
import JobsDataSource from "../datasources/jobs.datasource";

interface GraphqlContext {
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

const server = new ApolloServer<GraphqlContext>({
    resolvers,
    typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest, GraphqlContext>(server, {
    context: async (req, res) => {
        return {
            req,
            res,
            dataSources: {
                jobs: new JobsDataSource(),
            },
        };
    },
});

const handlerWithCors = async (request: NextRequest) => {
    const response = await handler(request);
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "*");
    response.headers.set("Access-Control-Allow-Credentials", "true");
    return response;
};

export async function OPTIONS(_request: NextRequest) {
    return new Response("", {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "*",
        },
    });
}

export async function GET(request: NextRequest) {
    return handlerWithCors(request);
}

export async function POST(request: NextRequest) {
    return handlerWithCors(request);
}

import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const server = new ApolloServer({
    resolvers,
    typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async (req, res) => ({
        req,
        res,
        dataSources: {},
    }),
});
export async function GET(request: NextRequest) {
    return handler(request);
}
export async function POST(request: NextRequest) {
    return handler(request);
}

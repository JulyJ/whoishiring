import { NextRequest, NextResponse } from "next/server";
import JobsDataSource from "../datasources/jobs.datasource";

const resolvers = {
    Query: {
        jobs: async (
            _req: NextRequest,
            _res: NextResponse,
            context: {
                dataSources: {
                    jobs: JobsDataSource;
                };
            },
        ) => {
            try {
                return await context.dataSources.jobs.getJobs();
            } catch (error) {
                console.error("Failed to fetch jobs", error);
            }
        },
    },
};

export default resolvers;

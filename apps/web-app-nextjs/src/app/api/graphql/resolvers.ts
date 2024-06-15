import JobsDataSource from "../datasources/jobs.datasource";

const resolvers = {
    Query: {
        jobs: async (
            _: any,
            __: any,
            context: {
                dataSources: {
                    jobs: JobsDataSource;
                };
            },
        ) => {
            try {
                return await context.dataSources.jobs.getJobs();
            } catch (error) {
                console.error("Failed to fetch jobs");
            }
        },
    },
};

export default resolvers;

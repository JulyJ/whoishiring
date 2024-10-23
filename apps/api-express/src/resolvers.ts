import { UnixTimestamp } from "./gql-timestamp.ts";
import type { Resolvers, JobPostingFilter } from "./types.ts";

export const resolvers: Resolvers = {
    UnixTimestamp,

    Listing: {},

    Query: {
        jobPostings: (_parent, { filter }, context, _info) => {
            return context.dataSources.jobPostingsMongo.getFilteredJobPostings(filter || {});
        },

        featuredListings: (_parent, _args, { dataSources }, _info) => {
            return dataSources.listingsAPI.getFeaturedListings();
        },
    },
};

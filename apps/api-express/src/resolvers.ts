import { UnixTimestamp } from "./gql-timestamp.ts";
import type { Resolvers } from "./types.ts";

export const resolvers: Resolvers = {
    UnixTimestamp,

    Listing: {},

    Query: {
        jobPostings: (_parent, { filter }, context, _info) => {
            return context.dataSources.jobPostingsMongo.getFilteredJobPostings(filter || {});
        },

        jobPostsPaginated(_parent, { limit, cursor, filter }, context, _info) {
            return context.dataSources.jobPostingsMongo.getPaginatedJobPostings(filter || {}, {
                limit,
                cursor: cursor || undefined,
            });
        },

        newJobCount(_parent, { lastFetchedTimestamp, filter }, context, _info) {
            return context.dataSources.jobPostingsMongo.getNewJobsCount(lastFetchedTimestamp, filter || {});
        },

        searchJobTags: (_parent, { searchQuery }, context, _info) => {
            return context.dataSources.jobPostingsMongo.searchJobTags(searchQuery || "");
        },

        featuredListings: (_parent, _args, { dataSources }, _info) => {
            return dataSources.listingsAPI.getFeaturedListings();
        },
    },
};

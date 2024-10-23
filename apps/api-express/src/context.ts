import type { JobPostingsMongoDataSource } from "./data-sources/job-postings-mongo.ts";
import type { ListingsAPI } from "./data-sources/listings-api.ts";

export type DataSourceContext = {
    dataSources: {
        listingsAPI: ListingsAPI;
        jobPostingsMongo: JobPostingsMongoDataSource;
    };
};

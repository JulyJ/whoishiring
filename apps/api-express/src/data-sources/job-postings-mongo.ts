import mongoose from "mongoose";
import type { JobPosting, JobTag } from "../types.ts";
import type { JobPostingFilter } from "../types.ts";

export class JobPostingsMongoDataSource {
    private collection: string;
    private jobTagsCollection: string = "job_tags";

    constructor(collection: string) {
        this.collection = collection;
    }

    private mapJobPosting(job: any): JobPosting {
        return {
            id: job._id.toString(),
            author: job.author || "",
            company: job.company || "",
            contact: job.contact || "",
            createdAt: job.created || Date.now(),
            date: job.date || "",
            description: job.description || "",
            hasFrontend: job.hasFrontend || false,
            hasQA: job.hasQA || false,
            hasRemote: job.hasRemote || false,
            hnThread: {
                id: job.threadId || "",
                date: job.date || "",
            },
            location: job.location || "",
            parsedUrls: job.parsedUrls || [],
            tags: Array.from(new Set(job.tags)) || [],
            text: job.original.text || "",
            urls: job.urls || [],
            title: job.title || "",
        };
    }

    // Old v2 format
    // private mapJobPostingV2(job: any): JobPosting {
    //     return {
    //         id: job._id.toString(),
    //         author: job.parsed.author,
    //         company: job.parsed.company,
    //         contact: job.parsed.contact,
    //         createdAt: job.parsed.created,
    //         date: job.parsed.date,
    //         description: job.parsed.jobDescription,
    //         hasFrontend: job.parsed.hasFrontend,
    //         hasQA: job.parsed.hasQA,
    //         hasRemote: job.parsed.hasRemote,
    //         hnThread: {
    //             id: job.parsed.threadId,
    //             date: job.parsed.date,
    //         },
    //         location: job.parsed.location,
    //         parsedUrls: job.parsed.parsedUrls,
    //         tags: job.parsed.tags,
    //         text: job.original.text,
    //         urls: job.parsed.urls,
    //         title: job.parsed.jobTitle,
    //     };
    // }

    private mapJobTag(tag: any): JobTag {
        return {
            id: tag._id,
            tag: tag.tag,
            count: tag.count,
        };
    }

    async searchJobTags(searchQuery: string): Promise<JobTag[]> {
        const jobsTagsCollection = mongoose.connection.db?.collection(this.jobTagsCollection);
        if (!jobsTagsCollection) {
            throw new Error("Job tags collection not found");
        }

        if (!searchQuery) {
            const tags = await jobsTagsCollection.find({}).sort({ count: -1 }).limit(10).toArray();
            return tags.map(this.mapJobTag);
        }

        const tags = await jobsTagsCollection
            .find({ tag: { $regex: searchQuery, $options: "i" } })
            .sort({ count: -1 })
            .limit(10)
            .toArray();

        return tags.map(this.mapJobTag);
    }

    async getFilteredJobPostings(filter: JobPostingFilter): Promise<JobPosting[]> {
        const jobsCollection = mongoose.connection.db?.collection(this.collection);
        if (!jobsCollection) {
            throw new Error("MongoDB collection not found");
        }

        let query: any = {};

        if (filter.fromDate || filter.toDate) {
            query.created = {};
        }

        if (filter.fromDate) {
            query.created!["$gte"] = filter.fromDate;
        }

        if (filter.toDate) {
            query.created!["$lte"] = filter.toDate;
        }

        if (filter.threadId) {
            query["original.threadId"] = filter.threadId;
        }

        if (filter.searchQuery) {
            query["original.text"] = {
                $regex: filter.searchQuery,
                $options: "i",
            };

            // query.$text = { $search: filter.searchQuery };
        }

        if (filter.tags && filter.tags.length > 0) {
            query.tags = { $all: filter.tags };
        }

        console.log("Filter", filter, "Query", query);

        const rawJobs = await jobsCollection.find(query).sort({ created: -1 }).limit(25).toArray();

        return rawJobs.map(this.mapJobPosting);
    }

    async getLatestJobPostings(): Promise<JobPosting[]> {
        const jobsCollection = mongoose.connection.db?.collection(this.collection);
        if (!jobsCollection) {
            throw new Error("MongoDB collection not found");
        }

        const rawJobs = await jobsCollection.find({}).sort({ created: -1 }).limit(25).toArray();

        // Old v2 format
        // return rawJobs.map((job) => {
        //     // const parsed =
        //     return {
        //         id: job._id.toString(),
        //         author: job.parsed.author,
        //         company: job.parsed.company,
        //         contact: job.parsed.contact,
        //         createdAt: job.parsed.created,
        //         date: job.parsed.date,
        //         description: job.parsed.jobDescription,
        //         hasFrontend: job.parsed.hasFrontend,
        //         hasQA: job.parsed.hasQA,
        //         hasRemote: job.parsed.hasRemote,
        //         hnThread: {
        //             id: job.parsed.threadId,
        //             date: job.parsed.date,
        //         },
        //         location: job.parsed.location,
        //         parsedUrls: job.parsed.parsedUrls,
        //         tags: job.parsed.tags,
        //         text: job.original.text,
        //         urls: job.parsed.urls,
        //         title: job.parsed.jobTitle,
        //     };
        // });

        return rawJobs.map(this.mapJobPosting);
    }
}

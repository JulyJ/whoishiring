import mongoose from "mongoose";
import type { JobPosting } from "../types.ts";
import type { JobPostingFilter } from "../types.ts";

export class JobPostingsMongoDataSource {
    private collection: string;

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
            hasFrontend: job.hasFrontend,
            hasQA: job.hasQA || false,
            hasRemote: job.hasRemote || false,
            hnThread: {
                id: job.threadId || "",
                date: job.date || "",
            },
            location: job.location || "",
            parsedUrls: job.parsedUrls || [],
            tags: job.tags || [],
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
            // query["original.text"] = {
            //     $regex: filter.searchQuery,
            //     $options: "i",
            // };

            query.$text = { $search: filter.searchQuery };
            // query["original.text"] = { $search: filter.searchQuery };
        }

        const rawJobs = await jobsCollection.find(query).sort({ created: -1 }).limit(100).toArray();

        return rawJobs.map(this.mapJobPosting);
    }

    async getLatestJobPostings(): Promise<JobPosting[]> {
        const jobsCollection = mongoose.connection.db?.collection(this.collection);
        if (!jobsCollection) {
            throw new Error("MongoDB collection not found");
        }

        const rawJobs = await jobsCollection.find({}).sort({ created: -1 }).limit(100).toArray();

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

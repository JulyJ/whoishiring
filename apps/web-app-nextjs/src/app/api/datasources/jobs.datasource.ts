import { ObjectId } from "mongodb";
import mongoose from "mongoose";

interface ParsedJob {
    _id: ObjectId;
    jobTitle: string;
    jobDescription: string;
    company: string;
    location: string;
    contact: string | null;
    notes: string;
    parsedUrls: string[];
    tags: string[];
    created: number;
    docId: ObjectId;
    date: string;
    urls: string[];
    hasRemote: boolean;
    hasQA: boolean;
    hasFrontend: boolean;
}

export default class JobsDataSource {
    async getJobs() {
        const jobsCollection = mongoose.connection.db.collection(process.env.MONGODB_COLLECTION!);
        const jobs = await jobsCollection.find({}).sort({ created: -1 }).limit(10).toArray();
        return jobs;
    }
}

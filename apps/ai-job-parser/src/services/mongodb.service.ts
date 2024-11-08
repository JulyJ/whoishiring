import { Collection, Db, MongoClient } from "mongodb";

export class MongoDBService {
    private client: MongoClient;
    private db?: Db;
    private parsedJobCollection?: Collection;

    constructor(uri: string) {
        this.client = new MongoClient(uri);
    }

    async connect(db: string, collection: string) {
        console.log("Connecting to the replica set...");
        try {
            await this.client.connect();
            console.log("Connected successfully to the replica set");

            this.db = this.client.db(db);
            this.parsedJobCollection = this.db.collection(collection);
        } catch (err) {
            console.error("Failed to connect to the mongodb:", err);
        }
    }

    async findDocuments() {
        const docs = await this.parsedJobCollection?.find({}).toArray();
        console.log("Documents:", docs);
    }

    async insertJob(document: any) {
        if (!this.parsedJobCollection) {
            console.error("Collection is not initialized");
            return;
        }

        try {
            await this.parsedJobCollection?.insertOne(document);
            this.updateTags(document.parsed.tags);
        } catch (err) {
            console.error("Failed to insert document:", err);
        }
    }

    async updateTags(tags: string[]) {
        for (let tag of tags) {
            this.db?.collection("job_tags").updateOne({ tag: tag }, { $inc: { count: 1 } }, { upsert: true });
        }
    }

    async close() {
        await this.client.close();
    }
}

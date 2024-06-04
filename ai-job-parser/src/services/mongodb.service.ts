import { Collection, Db, MongoClient } from "mongodb";

export class MongoDBService {
    private client: MongoClient;
    private db?: Db;
    private collection?: Collection;

    constructor(uri: string) {
        this.client = new MongoClient(uri);
    }

    async connect(db: string, collection: string) {
        console.log("Connecting to the replica set...");
        try {
            await this.client.connect();
            console.log("Connected successfully to the replica set");

            this.db = this.client.db(db);
            this.collection = this.db.collection(collection);
        } catch (err) {
            console.error("Failed to connect to the mongodb:", err);
        }
    }

    async findDocuments() {
        const docs = await this.collection?.find({}).toArray();
        console.log("Documents:", docs);
    }

    async insertDocument(document: any) {
        if (!this.collection) {
            console.error("Collection is not initialized");
            return;
        }

        try {
            await this.collection?.insertOne(document);
        } catch (err) {
            console.error("Failed to insert document:", err);
        }
    }

    async close() {
        await this.client.close();
    }
}

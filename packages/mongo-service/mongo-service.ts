import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Read from default ".env" file.
dotenv.config();

const uri: string = process.env.MONGODB_URI || "";
const dbName: string = process.env.MONGODB_DB || "";
const dbCollection: string = process.env.MONGODB_COLLECTION || "";

interface Data {
    id?: string;
    [key: string]: any;
}

async function connectToDatabase(): Promise<MongoClient> {
    const client = new MongoClient(uri);
    await client.connect();
    return client;
}

export async function insertData(data: Data[], dbCollectionName: string = dbCollection): Promise<void> {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection(dbCollectionName);

    try {
        await collection.insertMany(data);
        console.log("Data inserted successfully");
    } catch (err) {
        console.error("Error inserting data:", err);
    } finally {
        await client.close();
    }
}

export async function insertRecord(data: Data, dbCollectionName: string = dbCollection): Promise<void> {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection(dbCollectionName);

    try {
        await collection.insertOne(data);
        console.log(`Data ${data.id} inserted successfully`);
    } catch (err) {
        console.error("Error inserting data:", err);
    } finally {
        await client.close();
    }
}

export async function deleteRecord(data: string, dbCollectionName: string = dbCollection): Promise<void> {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection(dbCollectionName);

    try {
        const query = { id: data };
        await collection.deleteOne(query);
        console.log(`Record ${data} deleted successfully`);
    } catch (err) {
        console.error("Error deleting record:", err);
    } finally {
        await client.close();
    }
}

export async function checkRecord(data: string, dbCollectionName: string = dbCollection): Promise<boolean> {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection(dbCollectionName);

    try {
        const query = { id: data };
        const record = await collection.findOne(query);

        if (record) {
            return true;
        } else {
            return false;
        }
    } finally {
        await client.close();
    }
}

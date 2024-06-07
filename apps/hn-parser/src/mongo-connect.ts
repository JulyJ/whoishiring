import { MongoClient } from 'mongodb';

const uri: string = process.env.MONGODB_URI || '';
const dbName: string = process.env.MONGODB_DB || '';

interface Data {
  id?: string;
  [key: string]: any;
}

async function connectToDatabase(): Promise<MongoClient> {
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

export async function insertData(data: Data[]): Promise<void> {
  const client = await connectToDatabase();
  const db = client.db(dbName);
  const collection = db.collection('jobs');

  try {
    await collection.insertMany(data);
    console.log('Data inserted successfully');
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    await client.close();
  }
}

export async function insertRecord(data: Data): Promise<void> {
  const client = await connectToDatabase();
  const db = client.db(dbName);
  const collection = db.collection('jobs');

  try {
    await collection.insertOne(data);
    console.log(`Data ${data.id} inserted successfully`);
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    await client.close();
  }
}

export async function deleteRecord(data: string): Promise<void> {
  const client = await connectToDatabase();
  const db = client.db(dbName);
  const collection = db.collection('jobs');

  try {
    const query = { id: data };
    await collection.deleteOne(query);
    console.log(`Record ${data} deleted successfully`);
  } catch (err) {
    console.error('Error deleting record:', err);
  } finally {
    await client.close();
  }
}

export async function checkRecord(data: string): Promise<boolean> {
  const client = await connectToDatabase();
  const db = client.db(dbName);
  const collection = db.collection('jobs');

  try {
    const query = { id: data };
    const record = await collection.findOne(query);
    
    if (record) {
      console.log(`Record ${data} exists`);
      return true;
    } else {
      console.log(`Record ${data} does not exist`);
      return false;
    }
  } finally {
    await client.close();
  }
}

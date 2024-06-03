const { MongoClient } = require('mongodb');

const uri = process.env.URI;
const dbName=  process.env.DBNAME;

export async function insertData(data) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('jobs');

    await collection.insertMany(data);
    console.log('Data inserted successfully');
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    await client.close();
  }
}

export async function insertRecord(data) {
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('jobs');
  
      await collection.insertOne(data);
      console.log('Data inserted successfully');
    } catch (err) {
      console.error('Error inserting data:', err);
    } finally {
      await client.close();
    }
  }

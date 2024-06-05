const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

async function connectToDatabase() {
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

async function insertData(data) {
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

async function insertRecord(data) {
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

async function deleteRecord(data) {
  // Implement deleteRecord functionality
}

async function checkRecord(data) {
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

module.exports = { insertData, insertRecord, deleteRecord, checkRecord };

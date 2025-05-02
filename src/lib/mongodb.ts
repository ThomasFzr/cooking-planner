import { MongoClient } from 'mongodb';

// Ensure that the MongoDB URI is defined
if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Create a global MongoClient instance
const mongoClient = new MongoClient(process.env.MONGODB_URI);

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

const connectToDatabase = async () => {
  // If the client and database are cached, return them
  if (cachedClient && cachedDb) {
    return { db: cachedDb, client: cachedClient };
  }

  // Otherwise, connect to the database and cache the client and db
  const client = await mongoClient.connect();
  const db = client.db(process.env.MONGODB_DB); // You can specify the database name here if needed
  
  // Cache the client and db
  cachedClient = client;
  cachedDb = db;

  return { db, client };
};

export { connectToDatabase };

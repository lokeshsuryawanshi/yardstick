// lib/mongodb.ts
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri: string = process.env.MONGODB_URI;
const options = {};

let client = new MongoClient(uri, options);
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // Use a global variable in development to prevent multiple connections
  if (!(global as any)._mongoClientPromise) {
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;

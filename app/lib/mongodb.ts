import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri: string = process.env.MONGODB_URI;
const options = {};

const client = new MongoClient(uri, options);
let clientPromise: Promise<MongoClient>;

// Define a custom interface for the global object
interface CustomGlobal {
  _mongoClientPromise?: Promise<MongoClient>;
}

declare const global: CustomGlobal;

if (process.env.NODE_ENV === 'development') {
  // Use a global variable in development to prevent multiple connections
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGO_DB_URI;

if (!mongoUri) {
  throw new Error("Please define MONGO_DB_URI environment variable");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient> | undefined;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(mongoUri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(mongoUri);
  clientPromise = client.connect();
}

clientPromise.then(() => console.log("✅ MongoDB connected successfully"));

export default clientPromise;

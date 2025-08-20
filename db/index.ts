// @/db/index.ts
import { MongoClient, Db } from "mongodb";

declare global {
  // Avoid TS re-declaration errors in dev hot-reload
  // We keep the client and DB cached on globalThis
  // just like we did with Prisma
  // eslint-disable-next-line no-var
  var cachedMongo:
    | {
        client: MongoClient | null;
        db: Db | null;
      }
    | undefined;
}

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;

if (!uri) {
  throw new Error("❌ Please add your MONGODB_URI to .env");
}
if (!dbName) {
  throw new Error("❌ Please add your MONGODB_DB to .env");
}

let client: MongoClient;
let db: Db;

if (process.env.NODE_ENV === "production") {
  // In production, always create a new client
  client = new MongoClient(uri);
  db = client.db(dbName);
} else {
  // In dev, use cached connection to survive hot reloads
  if (!global.cachedMongo) {
    client = new MongoClient(uri);
    db = client.db(dbName);

    global.cachedMongo = { client, db };
  } else {
    client = global.cachedMongo.client!;
    db = global.cachedMongo.db!;
  }
}

export const mongoClient = client;
export const mongoDb = db;

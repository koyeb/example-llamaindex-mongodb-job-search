// File: lib/mongo/instance.server.ts

import { MongoClient } from "mongodb";

export const databaseName = process.env.MONGODB_DATABASE as string;
export const indexName = process.env.MONGODB_VECTOR_INDEX as string;
export const vectorCollectionName = process.env.MONGODB_VECTORS as string;

export const client = new MongoClient(process.env.MONGODB_URI as string);

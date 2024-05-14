// File: lib/mongo/store.server.ts

import {
  indexName,
  databaseName as dbName,
  client as mongodbClient,
  vectorCollectionName as collectionName,
} from "@/lib/mongo/instance.server";
import { MongoDBAtlasVectorSearch } from "llamaindex/storage/vectorStore/MongoDBAtlasVectorStore";

export default new MongoDBAtlasVectorSearch({
  mongodbClient,
  dbName,
  indexName,
  collectionName,
});

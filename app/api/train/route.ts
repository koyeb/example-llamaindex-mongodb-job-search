// File: app/api/train/route.ts

export const runtime = "nodejs";

import {
  Document,
  VectorStoreIndex,
  storageContextFromDefaults,
} from "llamaindex";
import {
  client,
  vectorCollectionName,
  databaseName,
} from "@/lib/mongo/instance.server";
import vectorStore from "@/lib/mongo/store.server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { jobs } = await request.json();
    // Get MongoDB database and collection
    const db = client.db(databaseName);
    const collection = db.collection(vectorCollectionName);
    // Insert all jobs from the request in MongoDB
    await collection.insertMany(jobs);
    // Create LlamaIndex Text Documents containing job data as Metadata
    const documents = jobs.map(
      (job: Record<any, any>) =>
        new Document({
          // Use the job description
          text: job.job_description,
          // Attach metadata as the job JD
          metadata: JSON.parse(JSON.stringify(job)),
        })
    );
    // Index all the Text Documents in MongoDB Atlas
    const storageContext = await storageContextFromDefaults({ vectorStore });
    await VectorStoreIndex.fromDocuments(documents, { storageContext });
    return NextResponse.json({ code: 1 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ code: 0 });
  }
}

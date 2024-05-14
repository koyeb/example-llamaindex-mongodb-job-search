// File: app/api/chat/route.ts

export const runtime = "nodejs";

import { VectorStoreIndex } from "llamaindex";
import completionServer from "@/lib/openai.server";
import vectorStore from "@/lib/mongo/store.server";
import { NextRequest, NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse, type Message } from "ai";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    const userMessages = messages.filter((i: Message) => i.role === "user");
    const query = userMessages[userMessages.length - 1].content;
    const index = await VectorStoreIndex.fromVectorStore(vectorStore);
    const retriever = index.asRetriever({ similarityTopK: 10 });
    const queryEngine = index.asQueryEngine({ retriever });
    const { sourceNodes } = await queryEngine.query({ query });
    let systemKnowledge: any[] = [];
    if (sourceNodes) {
      systemKnowledge = sourceNodes
        .filter((match) => match.score && match.score > 0.9)
        .map((match) => JSON.stringify(match.node.metadata));
    }
    const completionResponse = await completionServer.chat.completions.create({
      stream: true,
      model: "gpt-3.5-turbo",
      messages: [
        {
          // create a system content message to be added as
          // the open ai text completion will supply it as the context with the API
          role: "system",
          content: `Behave like a Google for job listings. You have the knowledge of only the following job that are relevant to the user right now: [${JSON.stringify(
            systemKnowledge
          )}]. Each response should be in 100% markdown compatible format, an un-ordered list, have hyperlinks in it to the job taken from the job_link attribute and brief description of what's required in the job taken from the job_description attribute. Be precise.`,
        },
        // also, pass the whole conversation!
        ...messages,
      ],
    });
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(completionResponse);
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      "There was an Internal Server Error. Can you try again?",
      {
        status: 500,
      }
    );
  }
}

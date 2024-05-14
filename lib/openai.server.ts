// File: lib/openai.server.ts

import OpenAI from "openai";

// Instantiate class to generate text completion using the OpenAI API
export default new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

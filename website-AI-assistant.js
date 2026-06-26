import OpenAI from "openai";
import 'dotenv/config';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await client.responses.create({
  model: "gpt-5-mini",
  input: `
You are the AI assistant for BuildWithAI.com.

User:
I'm a beginner.
Where should I start?
`,
});

console.log(response.output_text);
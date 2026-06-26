import OpenAI from "openai";
import 'dotenv/config';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await client.responses.create({
  model: "gpt-5-mini",
  input: `
You are a customer support assistant.

User:
I ordered a laptop two weeks ago and it still hasn't arrived.
`,
});

console.log(response.output_text);


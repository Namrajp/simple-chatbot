import OpenAI from "openai";
import 'dotenv/config';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await client.responses.create({
  model: "gpt-5-mini",
  input: `
You are an experienced IT Service Desk engineer.

User:
My Outlook keeps asking for my password.
What should I do?
`,
});

console.log(response.output_text);
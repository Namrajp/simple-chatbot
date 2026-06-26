import "dotenv/config";

import express from "express";
import OpenAI from "openai";
import { fileURLToPath } from "node:url";

import path from "node:path";

import { reviewCode } from "./code_reviewer.js";
import { runCustomerSupportChatbot } from "./customer-support-chatbot.js";
import { summarizeTicket } from "./helpdesk_ticket_summarizer.js";
import { improveResume } from "./resume_improver.js";
import { summarizeText } from "./summarizer.js";
import { translateToNepali } from "./translator.js";
import { runWebsiteAssistant } from "./website-AI-assistant.js";

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const handlers = {
  ticket: summarizeTicket,
  resume: improveResume,
  review: reviewCode,
  support: runCustomerSupportChatbot,
  translate: translateToNepali,
  website: runWebsiteAssistant,
  summary: summarizeText,
};
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Simple chatbot server is running.");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/chat", async (req, res) => {
  const { mode, prompt } = req.body ?? {};

  if (typeof mode !== "string" || !handlers[mode]) {
    return res.status(400).json({
      error:
        "Choose a valid mode: ticket, resume, review, support, translate, website, or summary.",
    });
  }

  if (typeof prompt !== "string" || prompt.trim().length === 0) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const output = await handlers[mode](prompt.trim(), client);
    return res.json({ mode, output });
  } catch (error) {
    console.error("OpenAI request failed:", error);
    return res.status(500).json({
      error: "The AI request failed. Check the server logs and try again.",
    });
  }
});

// app.post("/chat", async (req, res) => {
//   try {
//     const message = req.body?.message;1

//     if (!message) {
//       return res.status(400).json({ error: "message is required" });
//     }

//     if (!process.env.OPENAI_API_KEY) {
//       return res.status(500).json({ error: "OPENAI_API_KEY is not set" });
//     }

//     const client = new OpenAI({
//       apiKey: process.env.OPENAI_API_KEY
//     });

//     const response = await client.responses.create({
//       model: "gpt-5",
//       input: message
//     });

//     res.json({ reply: response.output_text });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to generate response" });
//   }
// });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

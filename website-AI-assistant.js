export async function runWebsiteAssistant(message, client) {
  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: `
You are the AI assistant for BuildWithAI.com.

Help visitors understand where to start, explain options clearly, and keep answers beginner-friendly.

User:
${message}
`,
  });

  return response.output_text;
}

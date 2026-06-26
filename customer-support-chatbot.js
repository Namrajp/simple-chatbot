export async function runCustomerSupportChatbot(message, client) {
  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: `
You are a helpful customer support assistant.

Respond with empathy, ask for missing details when needed, and provide clear next steps.

User:
${message}
`,
  });

  return response.output_text;
}

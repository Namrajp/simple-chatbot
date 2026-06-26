export async function summarizeText(text, client) {
  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: `
Summarize this text in 3 short bullet points:

${text}
`,
  });

  return response.output_text;
}

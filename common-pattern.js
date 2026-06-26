const response = await client.responses.create({
  model: "gpt-5-mini",
  input: `
<instructions>

<data or conversation>

<user request>
`,
});

console.log(response.output_text);
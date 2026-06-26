const form = document.querySelector("#chat-form");
const modeSelect = document.querySelector("#mode");
const promptInput = document.querySelector("#prompt");
const responseOutput = document.querySelector("#response-output");
const selectedMode = document.querySelector("#selected-mode");
const statusPill = document.querySelector("#status-pill");
const submitButton = document.querySelector("#submit-button");

const modeLabels = {
  summary: "Summary",
  ticket: "Ticket",
  resume: "Resume",
  review: "Review",
  support: "Customer Support",
  translate: "Translate",
  website: "Website Assistant",
};

const promptPlaceholders = {
  summary: "Paste the text you want summarized.",
  ticket: "Paste a helpdesk ticket or incident note.",
  resume: "Paste resume bullets or role details.",
  review: "Paste JavaScript code to review.",
  support: "Type a customer question or complaint.",
  translate: "Paste text to translate to Nepali.",
  website: "Type a BuildWithAI.com visitor question.",
};

function getModeLabel(value) {
  return modeLabels[value] || value;
}

function setStatus(label, state = "ready") {
  statusPill.textContent = label;
  statusPill.classList.remove("loading", "error");

  if (state !== "ready") {
    statusPill.classList.add(state);
  }
}

modeSelect.addEventListener("change", () => {
  const mode = modeSelect.value;
  selectedMode.textContent = getModeLabel(mode);
  promptInput.placeholder = promptPlaceholders[mode] || "Enter your prompt.";
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const mode = modeSelect.value;
  const prompt = promptInput.value.trim();

  if (!prompt) {
    responseOutput.textContent = "Enter a prompt before sending.";
    setStatus("Error", "error");
    promptInput.focus();
    return;
  }

  submitButton.disabled = true;
  responseOutput.textContent = "Working...";
  setStatus("Working", "loading");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mode, prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Request failed.");
    }

    selectedMode.textContent = getModeLabel(data.mode);
    responseOutput.textContent = data.output || "No response returned.";
    setStatus("Ready");
  } catch (error) {
    responseOutput.textContent = error.message;
    setStatus("Error", "error");
  } finally {
    submitButton.disabled = false;
  }
});

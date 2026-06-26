const form = document.querySelector("#chat-form");
const modeSelect = document.querySelector("#mode");
const promptInput = document.querySelector("#prompt");
const responseOutput = document.querySelector("#response-output");
const selectedMode = document.querySelector("#selected-mode");
const statusPill = document.querySelector("#status-pill");
const submitButton = document.querySelector("#submit-button");
const modeDescription = document.querySelector("#mode-description");
const modeExample = document.querySelector("#mode-example");

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

const modeInfo = {
  summary: {
    description: "Condenses longer text into three short bullet points.",
    example: [
      "Example: Docker packages an app with its dependencies.",
      "It helps the same app run consistently on different machines.",
    ],
  },
  ticket: {
    description: "Turns a helpdesk issue into a problem, actions, and next step.",
    example: [
      "Example: User cannot connect to Wi-Fi after rebooting.",
      "Laptop says connected, but the internet is unavailable.",
    ],
  },
  resume: {
    description: "Improves resume bullets with stronger, ATS-friendly wording.",
    example: [
      "Example: Helped users with computer problems.",
      "Used Microsoft Office and handled support requests.",
    ],
  },
  review: {
    description: "Reviews JavaScript code and suggests a cleaner version.",
    example: [
      "Example: function add(a,b){ return a+b }",
      "Check formatting, missing semicolons, and readability.",
    ],
  },
  support: {
    description: "Replies to customer questions with empathy and clear next steps.",
    example: [
      "Example: I ordered a laptop two weeks ago.",
      "It still has not arrived and I need an update.",
    ],
  },
  translate: {
    description: "Translates English text into Nepali.",
    example: [
      "Example: Hello, how are you?",
      "I am learning the OpenAI API.",
    ],
  },
  website: {
    description: "Answers visitor questions for BuildWithAI.com in a beginner-friendly way.",
    example: [
      "Example: I am a beginner.",
      "Where should I start with AI projects?",
    ],
  },
};

function getModeLabel(value) {
  return modeLabels[value] || value;
}

function updateModeDetails(mode) {
  const info = modeInfo[mode];
  selectedMode.textContent = getModeLabel(mode);
  promptInput.placeholder = promptPlaceholders[mode] || "Enter your prompt.";

  if (!info) {
    modeDescription.textContent = "";
    modeExample.textContent = "";
    return;
  }

  modeDescription.textContent = info.description;
  modeExample.replaceChildren(
    document.createTextNode(info.example[0]),
    document.createElement("br"),
    document.createTextNode(info.example[1]),
  );
}

function setStatus(label, state = "ready") {
  statusPill.textContent = label;
  statusPill.classList.remove("loading", "error");

  if (state !== "ready") {
    statusPill.classList.add(state);
  }
}

modeSelect.addEventListener("change", () => {
  updateModeDetails(modeSelect.value);
});

updateModeDetails(modeSelect.value);

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

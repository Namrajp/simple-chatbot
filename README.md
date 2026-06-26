How I created this Chatbot?


mkdir simple-chatbot
cd
npm init -y

npm install openai

create .env file with
OPENAI_API_KEY="your_api_key_here" node summarizer.js

on package.json change type="module" to use import in app.js


# how to use dotenv
npm install dotenv
import 'dotenv/config';
node --env-file=.env app.js = node app.js
apiKey: process.env.OPENAI_API_KEY

use nodemon for dev live reload dev environment

# create a simple express server in app.js (codex prompt)

 Created a simple Express server in app.js:1.

  It now has:

  GET  /        -> basic server message
  GET  /health  -> { "status": "ok" }
  POST /chat    -> sends req.body.message to OpenAI

  I also installed express, so package.json now includes it.

  Verified with:

  node app.js

  and /health returned:

  {"status":"ok"}

  Run it with:

  node app.js

  For /chat, you’ll still need OPENAI_API_KEY set in the environment, for example:

  node --env-file=.env app.js

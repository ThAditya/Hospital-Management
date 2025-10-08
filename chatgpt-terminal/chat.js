import OpenAI from "openai";
import readline from "readline";

// Set your API Key
const client = new OpenAI({
  apiKey: "YOUR_OPENAI_API_KEY" // Replace with your key
});

// Setup terminal input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function ask(question) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: question }]
  });
  console.log("\nChatGPT:", response.choices[0].message.content);
  rl.prompt();
}

rl.setPrompt("You: ");
rl.prompt();

rl.on("line", async (input) => {
  await ask(input);
});

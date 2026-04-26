const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // There is no direct listModels in the SDK for clients usually, 
    // but we can try a simple fetch if we want.
    // Let's just try the most basic model name 'gemini-1.0-pro'
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hi");
    console.log(await result.response.text());
  } catch (e) {
    console.log("Error:", e.message);
  }
}
listModels();

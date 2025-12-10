import { GoogleGenAI } from "@google/genai";
import { PROJECTS, SKILLS } from "../constants";

// Construct a system prompt based on the portfolio data
const SYSTEM_INSTRUCTION = `
You are "Nexus", an advanced AI assistant for Alex Void's portfolio website. Alex is a VR/AR Game Developer.
Your goal is to answer questions about Alex's skills, projects, and experience based on the data provided below.
Keep your answers professional but with a slight "tech/gamer" personality (concise, helpful, enthusiastic about technology).

Here is Alex's Data:
SKILLS: ${JSON.stringify(SKILLS)}
PROJECTS: ${JSON.stringify(PROJECTS)}
EXPERIENCE: 5+ years in Game Dev, specialized in Immersive Tech.
CONTACT: alex.void@example.com

Rules:
1. If asked about a specific project, provide details from the list.
2. If asked about contact info, provide the email.
3. If asked about something not in the data (like personal life), politely decline and steer back to professional skills.
4. Keep responses under 100 words unless asked for detail.
`;

let client: GoogleGenAI | null = null;

export const getGeminiClient = (): GoogleGenAI => {
  if (!client) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY is missing from environment variables");
      throw new Error("API Key missing");
    }
    client = new GoogleGenAI({ apiKey });
  }
  return client;
};

export const sendMessageToGemini = async (message: string, history: {role: 'user' | 'model', parts: [{text: string}]}[]): Promise<string> => {
  try {
    const ai = getGeminiClient();
    
    // We use generateContent for a single turn here for simplicity in this stateless example,
    // but building a chat history context manually allows for the "Chat" feel without persistent session management complexity on frontend.
    // However, the best practice for chat is ai.chats.create. Let's use that.
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history
    });

    const result = await chat.sendMessage({
      message: message
    });

    return result.text || "I'm having trouble accessing my memory banks right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Connection error. Please try again later.";
  }
};
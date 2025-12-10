import { GoogleGenAI } from "@google/genai";
import { PROJECTS, SKILLS } from "../constants";

// Construct a system prompt based on the portfolio data
const SYSTEM_INSTRUCTION = `
You are "Nexus", an advanced AI assistant for Ahmed Aglan's portfolio website. Ahmed is a senior VR/AR Game Developer and Team Lead.
Your goal is to answer questions about Ahmed's skills, projects, and experience based on the data provided below.
Keep your answers professional but with a slight "tech/gamer" personality (concise, helpful, enthusiastic about technology).

Here is Ahmed's Data:
SKILLS: ${JSON.stringify(SKILLS)}
PROJECTS: ${JSON.stringify(PROJECTS)}
EXPERIENCE: 10+ years in Game Dev, 2+ years as Team Lead. Shipped 20+ titles.
FOCUS: Delivering full-lifecycle immersive experiences, team leadership, and project management.
CONTACT: ahmedaglan993@gmail.com, LinkedIn: https://www.linkedin.com/in/ahmad-m-aglan-459735102/

Rules:
1. If asked about a specific project, provide details from the list (or say you are waiting for specific details if the list is generic).
2. If asked about contact info, provide the email and LinkedIn.
3. If asked about his role, emphasize his leadership and full-cycle development experience.
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

export const sendMessageToGemini = async (message: string, history: { role: 'user' | 'model', parts: [{ text: string }] }[]): Promise<string> => {
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
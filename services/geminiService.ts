import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateSecurePassword = async (): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning fallback password.");
    return "S3cur3P@ssw0rd!" + Math.floor(Math.random() * 1000);
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Generate a single, strong, secure password that is memorable but complex. It should contain at least one uppercase letter, one number, and one special character. Length between 12-16 characters. Return ONLY the password string, nothing else.",
      config: {
        responseMimeType: 'text/plain',
        temperature: 0.9,
      }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating password with Gemini:", error);
    return "F@llbackP@ss123";
  }
};
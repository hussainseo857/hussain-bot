import { GoogleGenAI } from '@google/genai';

let cachedClient: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (cachedClient) return cachedClient;
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error('GOOGLE_API_KEY is not set');
  cachedClient = new GoogleGenAI({ apiKey });
  return cachedClient;
}

export async function generateGeminiReply(prompt: string): Promise<string> {
  const ai = getClient();
  const res = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
    config: {
      temperature: 0.3,
      maxOutputTokens: 400,
    },
  });
  const text = res.text;
  if (!text || !text.trim()) {
    throw new Error('Empty response from Gemini.');
  }
  return text.trim();
}

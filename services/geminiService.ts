
import { GoogleGenAI } from "@google/genai";
import { BirthdayData } from "../types";

export const generateBirthdayGreeting = async (data: BirthdayData): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Write a warm, creative, and highly personalized birthday greeting in English.
    Birthday Person Details:
    - Name: ${data.name}
    ${data.age ? `- Age: ${data.age}` : ''}
    ${data.zodiac ? `- Zodiac Sign: ${data.zodiac}` : ''}
    ${data.gender ? `- Gender: ${data.gender}` : ''}
    ${data.industry ? `- Industry/Work: ${data.industry}` : ''}
    ${data.hobbies ? `- Hobbies/Interests: ${data.hobbies}` : ''}
    ${data.religion ? `- Religion: ${data.religion}` : ''}
    ${data.city ? `- City: ${data.city}` : ''}
    ${data.country ? `- Country: ${data.country}` : ''}
    ${data.familyStatus ? `- Family Status: ${data.familyStatus}` : ''}

    Instructions:
    1. The greeting should be sincere.
    2. Incorporate their hobbies and industry for creative metaphors.
    3. The tone should match the provided age and gender.
    4. If religion or country is provided, add appropriate cultural nuances if relevant.
    5. Make the text structured and beautiful.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });

    return response.text || "Sorry, I couldn't generate a greeting.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Error communicating with AI. Please try again later.");
  }
};

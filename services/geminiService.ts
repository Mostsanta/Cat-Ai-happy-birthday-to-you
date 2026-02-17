
import { GoogleGenAI } from "@google/genai";
import { BirthdayData } from "../types";

export const generateBirthdayGreeting = async (data: BirthdayData): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Напиши теплое, креативное и очень персонализированное поздравление с днем рождения на русском языке.
    Данные именинника:
    - Имя: ${data.name}
    ${data.age ? `- Возраст: ${data.age}` : ''}
    ${data.zodiac ? `- Знак зодиака: ${data.zodiac}` : ''}
    ${data.gender ? `- Пол: ${data.gender}` : ''}
    ${data.industry ? `- Индустрия работы: ${data.industry}` : ''}
    ${data.hobbies ? `- Хобби/Увлечения: ${data.hobbies}` : ''}
    ${data.religion ? `- Религия: ${data.religion}` : ''}
    ${data.city ? `- Город: ${data.city}` : ''}
    ${data.country ? `- Страна: ${data.country}` : ''}
    ${data.familyStatus ? `- Семейный статус: ${data.familyStatus}` : ''}

    Инструкции:
    1. Поздравление должно быть искренним.
    2. Учти его хобби и индустрию работы для метафор.
    3. Тон должен соответствовать указанному возрасту и полу.
    4. Если указана религия или страна, можно добавить уместные культурные нотки.
    5. Сделай текст структурированным и красивым.
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

    return response.text || "Извините, не удалось сгенерировать поздравление.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Ошибка при обращении к AI. Попробуйте позже.");
  }
};

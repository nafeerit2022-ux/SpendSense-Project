import { GoogleGenAI } from "@google/genai";
import { Transaction, TransactionType } from '../types';

// Fix: Per coding guidelines, directly initialize GoogleGenAI client assuming API_KEY is present.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


export const getExpenseAnalysis = async (transactions: Transaction[]): Promise<string> => {
  const model = 'gemini-2.5-flash';
  
  // Fix: Filter for expense transactions only for an accurate spending analysis.
  const transactionSummary = transactions
    .filter(t => t.type === TransactionType.EXPENSE)
    .slice(-30) // Limit to last 30 transactions for brevity
    .map(t => `- $${t.amount.toFixed(2)} on ${t.category}, Date: ${t.date}${t.note ? `, Note: ${t.note}` : ''}`)
    .join('\n');

  if (!transactionSummary) {
    return "Not enough expense data to provide an analysis. Please add some expenses first.";
  }

  const prompt = `
    You are SpendSense, a friendly and insightful financial advisor.
    Based on the following recent expense transactions, provide a brief, easy-to-understand analysis of the user's spending habits.
    
    Your analysis should:
    1.  Start with a brief, encouraging opening sentence.
    2.  Identify the top spending category.
    3.  Provide 2-3 specific, actionable tips for saving money based on their spending.
    4.  Keep the entire response concise (under 150 words).
    5.  Format the response using Markdown with headings and bullet points for readability.

    Here are the recent expense transactions:
    ${transactionSummary}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching analysis from Gemini:", error);
    return "Sorry, I couldn't generate an analysis at this time. Please check your API key and try again later.";
  }
};

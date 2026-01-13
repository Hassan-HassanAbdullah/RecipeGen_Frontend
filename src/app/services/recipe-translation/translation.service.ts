import { GoogleGenerativeAI } from '@google/generative-ai';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private genAI = new GoogleGenerativeAI(environment.GEMINI_API_KEY);

  constructor() { }

  async translateRecipe(recipe: Recipe): Promise<Recipe> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      Tumhe ek recipe JSON diya ja raha hai.
      Sirf iske "name", "description", "ingredients" aur "steps" ko Urdu me translate karo.
      Baaki fields jaisi ki "servings", "estimatedCookingTime", "cuisine", "dishTypes",
      "timeToPrepare", "timeToCook", "totalTime" bilkul same rakho.
      STRICTLY sirf valid JSON return karo — koi extra text, explanation, ya markdown fences ("'''") nahi.

      Recipe JSON:
      ${JSON.stringify(recipe)}

      IMPORTANT: Sirf ek valid JSON object return karo, bina kisi extra explanation ke.
    `;

    let attempts = 0;
    while (attempts < 3) {
      try {
        const result = await model.generateContent(prompt);
        let translatedText = result.response.text();

        // agar Gemini code fences de to clean karo
        translatedText = translatedText.replace(/```json|```/g, '').trim();

        // ✅ Safe parsing
        const translatedRecipe: Recipe = JSON.parse(translatedText);

        return translatedRecipe;  // ✅ Direct valid recipe return
      } catch (err: any) {
        attempts++;
        console.error(`❌ Translation error (attempt ${attempts}):`, err.message || err);

        // agar Gemini overload (503) ho to retry karo
        if (err.message?.includes('503') && attempts < 3) {
          await new Promise(r => setTimeout(r, 2000 * attempts)); // exponential backoff
          continue;
        }

        // fallback: original recipe return karo with error note
        // return {
        //   ...recipe,
        //   description: recipe.description + ' (Translation failed)'
        // };
      }
    }

    // agar sab fail ho jaye
    return recipe;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This makes the service globally available
})
export class DownloadRecipeService {

  constructor() {}

  // 📁 Function to download recipe as a .txt file
  downloadRecipeAsText(recipe: any): void {
    // ✅ Format the recipe into a readable text format
    const recipeText = `
        Recipe Title: ${recipe.name}
        Description: ${recipe.description}

        Ingredients:
        ${recipe.ingredients.map((ing: any, i: number) => `${i + 1}. ${ing}`).join('\n')}

        Steps:
        ${recipe.steps.map((step: any, i: number) => `${i + 1}. ${step}`).join('\n')}
            `;

    // ⚠️ Fix MIME type: 'text/plain' not 'text/plane'
    const blob = new Blob([recipeText], { type: 'text/plain' });

    // 🌐 Create a temporary URL for the blob file
    const url = URL.createObjectURL(blob);

    // 🖱️ Create an anchor tag to trigger download
    const a = document.createElement('a');
    a.href = url;

    // 🧾 Set file name using recipe title (spaces replaced with underscores)
    a.download = `${(recipe.name || recipe.title || 'Recipe').replace(/\s+/g, '_')}_recipe.txt`;


    // 👻 Add anchor to body, click it, then remove
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // 🧹 Revoke the object URL to free memory
    URL.revokeObjectURL(url);
  }
}
// 📄 This service provides functionality to download recipes as text files
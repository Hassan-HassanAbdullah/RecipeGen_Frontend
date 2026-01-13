import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenrateRecipeService {

  constructor( private http: HttpClient) { };

  private apiUrl = environment.recipeApiUrl; // Use the environment variable for API URL

  // Method to generate recipe based on ingredients
  generateRecipe(ingredients: string[]): Promise<any> {
    const body = { ingredients: ingredients };
    return this.http.post<any>(`${this.apiUrl}/generate-recipe`, body).toPromise()
      .then(response => {
        if (response && response.recipe) {
          console.log('Recipe generated successfully:', response.recipe);
          return response.recipe; // Return the generated recipe
        } else {
          throw new Error('Recipe generation failed');
        }
      })
      .catch(error => {
        console.error('Error generating recipe:', error);
        throw error; // Propagate the error
      });
  }

  // Method to search recipes by ingredient
  searchByIngredient(ingredient: string): Promise<any> {
    const body = { ingredient: ingredient };
    return this.http.post<any>(`${this.apiUrl}/searchByIngredient`, body).toPromise()
      .then(response => {
        if (response && response.recipes) {
          console.log('Recipes found:', response.recipes);
          return response.recipes; // Return the found recipes
        } else {
          throw new Error('No recipes found for the given ingredient');
        }
      })
      .catch(error => {
        console.error('Error searching recipes:', error);
        throw error; // Propagate the error
      });
  }
}

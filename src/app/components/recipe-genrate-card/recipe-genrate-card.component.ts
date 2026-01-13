import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GenrateRecipeService } from '../../services/recipe-api/genrate-recipe.service';
import { ToastService } from '../../services/toast/toast.service';
import { SaveRecipeService } from '../../services/saveRecipe/save-recipe.service';
import { AuthServiceService } from '../../services/auth-service.service';

interface SaveRecipeResponse {
  message: string;
  saved: boolean;
  savedRecipes: string[];
}



@Component({
  selector: 'app-recipe-genrate-card',
  imports: [NgFor, FormsModule, RouterLink, NgIf],
  templateUrl: './recipe-genrate-card.component.html',
  styleUrl: './recipe-genrate-card.component.css'
})

export class RecipeGenrateCardComponent {
  ingredientInput: string = '';
  ingredients: string[] = [];
  isloading: boolean = false;
  recipe: any = '';

  toastType: 'success' | 'error' | 'warning' | null = null;
  toastMessage: string = '';



  addIngredient(): void {
    const trimmed = this.ingredientInput.trim().toLowerCase(); // ✅ lowercase me convert
    if (trimmed && !this.ingredients.includes(trimmed)) {
      this.ingredients.push(trimmed);
      this.ingredientInput = '';
    } else {
      this.ingredientInput = ''; // agar duplicate ya empty ho to input clear karo
    }
  }

  removeIngredient(index: number): void {
    this.ingredients.splice(index, 1);
  }



  clearIngredients(): void {
    this.ingredients = [];
  }



  constructor(private GenrateRecipeService: GenrateRecipeService, private toastService: ToastService, private saveRecipeService: SaveRecipeService, private authService: AuthServiceService) { }

  ngOnInit(): void {
    const savedRecipe = localStorage.getItem('generatedRecipe');
    if (savedRecipe) {
      const parsed = JSON.parse(savedRecipe);
      const now = new Date().getTime();

      if (now < parsed.expiry) {
        this.recipe = parsed.data;
        console.log('Loaded saved recipe from localStorage.');
      } else {
        localStorage.removeItem('generatedRecipe');
        console.log('Saved recipe expired and removed.');
      }
    }
  }


  generateRecipe(): void {
    if (this.ingredients.length === 0) {
      this.toastService.showToast('warning', 'Please add ingredients.');
      return;
    }

    this.isloading = true;
    this.recipe = ''; // Reset recipe before generating a new one
    localStorage.removeItem('generatedRecipe'); // 🔥 Old recipe ko remove karo

    this.GenrateRecipeService.generateRecipe(this.ingredients)
      .then(response => {
        this.recipe = response; // or description, or whatever you want to display

        // ✅ Save in localStorage with expiry (e.g. 10 minutes)
        const expiryTime = new Date().getTime() + 120 * 60 * 1000; // 120 mins
        const recipeData = {
          data: response,
          expiry: expiryTime
        };
        localStorage.setItem('generatedRecipe', JSON.stringify(recipeData));


        this.toastService.showToast('success', 'Recipe generated successfully!');
        console.log('Recipe generated successfully:', this.recipe);
        this.ingredients = [];
        this.isloading = false;
      })
      .catch(error => {
        console.error('Error generating recipe:', error);
        this.toastService.showToast('error', 'Failed to generate recipe. please try again.');
        this.isloading = false;
      });

  }

  getEncodedRecipe() {
    return encodeURIComponent(JSON.stringify(this.recipe));
  };





  handleSave(recipe: any) {
    const token = localStorage.getItem('authToken');
    const userId = this.authService.getUserId();
    console.log('User ID:', userId);



    if (!token) {
      // alert('Please login first');
      this.toastService.showToast('warning', 'Please login first to save recipe ');
      return;
    }

    console.log(this.recipe);

    const body = {
      recipe: this.recipe,
      source: recipe.source || 'gemini', // gemini ya spoonacular
    };

    console.log(body);


    this.saveRecipeService.saveRecipe(body, token).subscribe({
      next: (res) => {
        // alert('Recipe saved successfully!');
        const typedResponse = res as SaveRecipeResponse;
        console.log("Response save is", typedResponse.message);
        if (typedResponse.saved === false) {
          this.toastService.showToast('warning', typedResponse.message);
        } else {
          this.toastService.showToast('success', typedResponse.message);
        }

      },
      error: (err) => {
        console.error(err);
        // alert('Failed to save recipe.');
        this.toastService.showToast('error', 'Failed to save recipe');
      },
    });
  }
}

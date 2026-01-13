import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DownloadRecipeService } from '../../services/downloadRecipe/download-recipe.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { ToastService } from '../../services/toast/toast.service';
import { SaveRecipeService } from '../../services/saveRecipe/save-recipe.service';
import { TranslationService } from '../../services/recipe-translation/translation.service';

interface SaveRecipeResponse {
  message: string;
  saved: boolean;
  savedRecipes: string[];
}

@Component({
  selector: 'app-recipe-detail',
  imports: [RouterLink, NgFor, NgIf, NgClass],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private downloadRecipeService: DownloadRecipeService,
    private authService: AuthServiceService,
    private toastService: ToastService,
    private saveRecipeService: SaveRecipeService,
    private recipeTranslationService: TranslationService
  ) {}

  recipe: any;            // UI me dikhane ke liye (English ya Urdu dono ho sakta)
  originalRecipe: any;    // Always English, backend ke liye

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        const recipeParam = params['recipe'];
      if (recipeParam) {
        try {
          this.originalRecipe = JSON.parse(decodeURIComponent(recipeParam)); // English
          this.recipe = { ...this.originalRecipe }; // UI default English
          console.log('📦 Recipe Received:', this.recipe);
        } catch (err) {
          console.error('❌ Error parsing recipe:', err);
        }
      }
    });
  }

  handleDownload(recipe: any) {
    if (!this.authService.checkLogin()) {
      this.toastService.showToast('error', 'Please login to download the recipe.');
    } else {
      this.downloadRecipeService.downloadRecipeAsText(recipe);
      this.toastService.showToast('success', 'Recipe downloaded successfully!');
    }
  }

  handleSave(recipe: any) {
    const token = localStorage.getItem('authToken');
    const userId = this.authService.getUserId();

    if (!token) {
      this.toastService.showToast('warning', 'Please login first to save recipe');
      return;
    }

    const body = {
      recipe: this.originalRecipe,   // ✅ Always send ENGLISH recipe
      source: recipe.source || 'gemini',
    };

    this.saveRecipeService.saveRecipe(body, token).subscribe({
      next: (res) => {
        const typedResponse = res as SaveRecipeResponse;
        if (typedResponse.saved === false) {
          this.toastService.showToast('warning', typedResponse.message);
        } else {
          this.toastService.showToast('success', typedResponse.message);
        }
      },
      error: (err) => {
        console.error(err);
        this.toastService.showToast('error', 'Failed to save recipe');
      },
    });
  }

  isTranslating: boolean = false;
  isUrduRecipe: boolean = false;


  async handleTranslate(recipe: any) {
    this.isTranslating = true;
    try {
      const translated = await this.recipeTranslationService.translateRecipe(recipe);

      // Sirf ye fields Urdu me replace hongi
      this.recipe = {
        ...this.originalRecipe,
        name: translated.name,
        description: translated.description,
        ingredients: translated.ingredients,
        steps: translated.steps
      };

      this.toastService.showToast('success', 'Recipe translated to Urdu!');
      console.log(this.recipe);
      
      this.isUrduRecipe = true; // Urdu aa gayi hai
    } catch (err) {
      console.error('❌ Translation error:', err);
      this.toastService.showToast('error', 'Failed to translate recipe');
    }finally {
    this.isTranslating = false;
  }
  }
}

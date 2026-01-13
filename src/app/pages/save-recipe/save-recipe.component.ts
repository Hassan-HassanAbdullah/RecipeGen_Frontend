import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { SaveRecipeService } from '../../services/saveRecipe/save-recipe.service';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-save-recipe',
  imports: [NgIf, NgFor, RecipeCardComponent],
  templateUrl: './save-recipe.component.html',
  styleUrl: './save-recipe.component.css'
})
export class SaveRecipeComponent {

  savedRecipes: any[] = [];
  errorMessage: string = '';
  
  
  
  constructor(private saveRecipeService: SaveRecipeService,) { }
  
  
  
  
  ngOnInit() {
    this.saveRecipeService.getSavedRecipes().subscribe({
      next: (data) => {
        this.savedRecipes = data; // API ka data save karo
        console.log(this.savedRecipes);
        
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Unauthorized or No Data';
      }
    });
    
  }
  

}

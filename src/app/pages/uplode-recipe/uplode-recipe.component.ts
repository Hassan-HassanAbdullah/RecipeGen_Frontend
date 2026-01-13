import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { RouterLink } from '@angular/router';
import { UploadRecipesService } from '../../services/uplodeRecipeService/upload-recipes.service';

@Component({
  selector: 'app-uplode-recipe',
  imports: [NgIf, NgFor, RecipeCardComponent,RouterLink],
  templateUrl: './uplode-recipe.component.html',
  styleUrl: './uplode-recipe.component.css'
})
export class UplodeRecipeComponent {

  uplodeRecipes: any[] = [];
  errorMessage: string = '';

  


  constructor(private UploadRecipesService: UploadRecipesService){}
  ngOnInit(){
    
    

    this.UploadRecipesService.getUploadRecipes().subscribe({
      next: (data) => {
        this.uplodeRecipes = data; // API ka data save karo
        console.log(this.uplodeRecipes);
        
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Unauthorized or No Data';
      }
    });
  }

  
}

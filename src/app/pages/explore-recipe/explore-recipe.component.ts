import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AllRecipesService } from '../../services/allRecipes/all-recipes.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { SaveRecipeService } from '../../services/saveRecipe/save-recipe.service';
import { AuthServiceService } from '../../services/auth-service.service';



@Component({
  selector: 'app-explore-recipe',
  imports: [NgFor, NgIf, RecipeCardComponent, FormsModule, NgxPaginationModule, FooterComponent],
  templateUrl: './explore-recipe.component.html',
  styleUrl: './explore-recipe.component.css'
})
export class ExploreRecipeComponent {

  errorMessage: string = '';
  selectedCuisine: string = 'all';
  selectedDishType: string = 'all';
  filteredRecipes: any[] = [];
  recipes: any[] = []


  // ✅ Pagination variables
  page: number = 1;       // current page
  // totalPages: number = 8;   // recipes per page



  cuisines = [
    { name: 'Italian', icon: '🍝' },
    { name: 'Chinese', icon: '🥡' },
    { name: 'Mexican', icon: '🌮' },
    { name: 'Indian', icon: '🍛' },
    { name: 'Pakistani', icon: '🍲' },
    { name: 'Japanese', icon: '🍣' },
    { name: 'Balochi', icon: '🍖' }

  ];

  dishTypes = ['Main Course',  'Dessert', 'Snack'];



  constructor(private allRecipeService: AllRecipesService, private saveRecipeService: SaveRecipeService) {
    console.log(this.filteredRecipes);

  }

  onFilterChange() {
    this.filteredRecipes = this.recipes.filter(recipe => {
      const cuisineMatch =
        this.selectedCuisine === 'all' ||
        recipe.cuisine.toLowerCase() === this.selectedCuisine.toLowerCase();

      const dishMatch =
        this.selectedDishType === 'all' ||
        recipe.dishTypes === this.selectedDishType;

      return cuisineMatch && dishMatch;
    });

    this.page = 1; // Reset page on filter change
  }


  ngOnInit() {
    this.allRecipeService.getSavedRecipes().subscribe({
      next: (data) => {
        this.recipes = data; // API ka data save karo
        this.filteredRecipes = this.recipes; // Default show all
        console.log(this.recipes);

      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Unauthorized or No Data';
      }
    })

    const token = localStorage.getItem('authToken');
    if (token) {
      // Jab page load ho to saved recipes ki list service mein daal dein
      this.saveRecipeService.loadSavedRecipes(token);
    }
  }




}
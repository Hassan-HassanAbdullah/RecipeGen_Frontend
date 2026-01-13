import { Component, input, Input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';
import { SaveRecipeService } from '../../services/saveRecipe/save-recipe.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';





@Component({
  selector: 'app-recipe-card',
  imports: [RouterLink,NgIf],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {

  @Input() recipe: any;
  isSaved = false; // Is property se button ka status control hoga
  private savedRecipesSub: Subscription | null = null; // Memory leak se bachne ke liye

  
  constructor( private toastService: ToastService, private saveRecipeService: SaveRecipeService, private authService: AuthServiceService) { }
  
  
  // Image array
  images = [
    'assets/foodimg1.webp',
    'assets/foodimg2.webp',
    'assets/foodimg3.webp'
  ];

  // Random image for each card
  randomImage: string = '';

  ngOnInit() {
    // Pick a random image when card renders
    this.randomImage = this.images[Math.floor(Math.random() * this.images.length)];


    // Service ke BehaviorSubject ko subscribe karein. Yeh sabse ahem step hai.
    this.savedRecipesSub = this.saveRecipeService.savedRecipes$.subscribe(ids => {
      // Check karein ke current recipe ki ID saved recipes ki list mein hai ya nahi
      if (this.recipe && this.recipe._id) {
        this.isSaved = ids.includes(this.recipe._id);
      }
    });
  }

  ngOnDestroy() {
    // Component destroy hone par subscription ko unsubscribe karein taake memory leak na ho
    if (this.savedRecipesSub) {
      this.savedRecipesSub.unsubscribe();
    }
  }
  


  defaultImage = 'assets/images/recipe-card-image.avif';

  getImage() {
    return this.recipe.image || this.defaultImage;
  }

  


  getEncodedRecipe() {
    return encodeURIComponent(JSON.stringify(this.recipe));
  };





  // recipe reating
  // getRandom(min: number, max: number): number {
  //   return Math.random() * (max - min) + min;
  // }


  

  

  
  onSave(recipe: any) {
    const token = localStorage.getItem('authToken');



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
        if (res && res.saved !== undefined) {
          const message = res.saved ? 'Recipe Saved successfully!' : 'Recipe UnSaved successfully!';
          this.toastService.showToast(res.saved ? 'success' : 'warning', message);
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

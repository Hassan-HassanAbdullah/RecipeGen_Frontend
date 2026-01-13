import { NgClass, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { SaveRecipeComponent } from '../save-recipe/save-recipe.component';
import { UplodeRecipeComponent } from '../uplode-recipe/uplode-recipe.component';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { UploadRecipesService } from '../../services/uplodeRecipeService/upload-recipes.service';
import { SaveRecipeService } from '../../services/saveRecipe/save-recipe.service';

@Component({
  selector: 'app-user-profile',
  imports: [NgClass, NgIf, SaveRecipeComponent, UplodeRecipeComponent, RouterLink, FooterComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  activeTab: string = 'my';
  uplodedRecipes: [] = []
  savedRecipes: [] = []
  user: any = null;
  saveRecipesCount: number = 0;
  uploadedRecipesCount:number = 0;

  setActive(tab: string) {
    this.activeTab = tab
  }

  constructor(private userService: UserService, private UploadRecipesService: UploadRecipesService, private SaveRecipeService: SaveRecipeService) { }


  ngOnInit() {
    // Check localStorage in case of reload
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.userService.setUser(JSON.parse(savedUser));
    }

    // Listen to user changes
    this.userService.user$.subscribe((userData) => {
      this.user = userData.name;
    });



    this.UploadRecipesService.getUploadRecipesCount().subscribe({
      next: (count) => {
        console.log("Total uploaded recipes:", count);
        this.uploadedRecipesCount = count;
      }
    });

    this.SaveRecipeService.getSavedRecipesCount().subscribe({
      next: (count) => {
        this.saveRecipesCount = count;
        console.log("Saved recipes count:", count);
      }
    });


  }









}

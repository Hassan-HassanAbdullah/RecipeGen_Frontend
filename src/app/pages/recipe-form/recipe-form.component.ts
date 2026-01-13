import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';
import { UploadRecipesService } from '../../services/uplodeRecipeService/upload-recipes.service';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-recipe-form',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css'
})
export class RecipeFormComponent {
  formData = {
    name: '',
    description: '',
    cookTime: '',
    servings: '',
    difficulty: 'Easy',
    ingredients: [''],
    instructions: [''],
    tags: [] as string[],
    newTag: '',
    cuisine: '',
    timeToPrepare: '',
    timeToCook: '',
    totalTime: '',
    dishTypes: '',
  };

  selectedFile: File | null = null; // class property

  dishTypes = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Appetizer', 'Snack', 'Soup', 'Salad', 'Main Course'];

  recipe: any = this.formData

  imagePreview: string | ArrayBuffer | null = null;

  uploadStatus: 'idle' | 'uploading' | 'success' | 'failed' = 'idle';



  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return; // no file selected

    if (file) {
      this.selectedFile = file; // ✅ store file for upload
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result || null;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.imagePreview = null;
  }

  isFormValid(): boolean {
    const isBasicInfoValid = this.formData.name.trim() !== '' &&
      this.formData.description.trim() !== '' &&
      this.formData.cookTime.trim() !== '' &&
      this.formData.servings.toString().trim() !== '';

    const hasIngredients = this.formData.ingredients.some(ing => ing.trim() !== '');
    const hasInstructions = this.formData.instructions.some(inst => inst.trim() !== '');

    return isBasicInfoValid && hasIngredients && hasInstructions;
  }

  addIngredient() {
    this.formData.ingredients = [...this.formData.ingredients, ''];
  }

  removeIngredient(index: number) {
    this.formData.ingredients.splice(index, 1);
  }

  addInstruction() {
    this.formData.instructions = [...this.formData.instructions, ''];
  }

  removeInstruction(index: number) {
    this.formData.instructions.splice(index, 1);
  }

  addTag() {
    if (this.formData.newTag.trim() && !this.formData.tags.includes(this.formData.newTag.trim())) {
      this.formData.tags = [...this.formData.tags, this.formData.newTag.trim()];
      this.formData.newTag = '';
    }
  }

  removeTag(tagToRemove: string) {
    this.formData.tags = this.formData.tags.filter(tag => tag !== tagToRemove);
  }



  cancel() {
    console.log("Cancelled.");
  }


  trackByIndex(index: number, obj: any): any {
    return index;
  }



  constructor(private toastService: ToastService, private UploadRecipesService: UploadRecipesService, private authService: AuthServiceService) { }



  // ✅ New method to reset the form and return to the 'idle' state
  backToForm() {
    this.uploadStatus = 'idle';
    this.resetForm()
  }

  // ✅ New method to reset all form data
  resetForm() {
    this.formData = {
      name: '',
      description: '',
      cookTime: '',
      servings: '',
      difficulty: 'Easy',
      ingredients: [''],
      instructions: [''],
      tags: [] as string[],
      newTag: '',
      cuisine: '',
      timeToPrepare: '',
      timeToCook: '',
      totalTime: '',
      dishTypes: '',
    };
    this.imagePreview = null;
    this.selectedFile = null;
  }


  handleUpload() {
    const token = localStorage.getItem('authToken');

    if (!token) {
      this.toastService.showToast('warning', 'Please login first to upload recipe');
      return;
    }


    // ✅ Set status to 'uploading' to show the loading screen
    this.uploadStatus = 'uploading'; 


    const formDataObj = new FormData();

    // Yahan hum formData ko backend schema ke hisaab se map kar rahe hain
    const transformedRecipeData = {
      name: this.formData.name,
      description: this.formData.description,
      // 'instructions' ko 'steps' mein map kiya gaya hai
      steps: this.formData.instructions.filter(inst => inst.trim() !== ''),
      // 'cookTime' ko 'estimatedCookingTime' mein map kiya gaya hai
      ingredients: this.formData.ingredients.filter(ing => ing.trim() !== ''),
      estimatedCookingTime: this.formData.cookTime,
      servings: this.formData.servings,
      difficulty: this.formData.difficulty,

      cuisine: this.formData.cuisine,
      timeToPrepare: this.formData.timeToPrepare,
      timeToCook: this.formData.timeToCook,
      totalTime: this.formData.totalTime,
      dishTypes: this.formData.dishTypes,
      source: 'User'
    };

    // Form fields append
    formDataObj.append('name', this.formData.name);
    formDataObj.append('description', this.formData.description);
    formDataObj.append('ingredients', JSON.stringify(this.formData.ingredients.filter(ing => ing.trim() !== '')));
    formDataObj.append('steps', JSON.stringify(this.formData.instructions.filter(inst => inst.trim() !== '')));
    formDataObj.append('estimatedCookingTime', this.formData.cookTime);
    formDataObj.append('servings', this.formData.servings);
    formDataObj.append('difficulty', this.formData.difficulty);
    formDataObj.append('cuisine', this.formData.cuisine);
    formDataObj.append('totalTime', this.formData.totalTime);
    formDataObj.append('dishTypes', this.formData.dishTypes);
    formDataObj.append('timeToPrepare', this.formData.timeToPrepare);
    formDataObj.append('timeToCook', this.formData.timeToCook);
    formDataObj.append('source', 'User');
    // Agar image select hui hai, to append karo
    if (this.selectedFile) {
      formDataObj.append('image', this.selectedFile);
    }

    console.log('Sending data:', formDataObj);

    for (let pair of formDataObj.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }


    



    this.UploadRecipesService.uploadRecipe(formDataObj, token).subscribe({
      next: (res) => {
        console.log('Recipe upload successful!', res);
        this.toastService.showToast('success', 'Recipe upload Successfully');
        
        // ✅ On success, set the status to 'success'
        this.uploadStatus = 'success';
        
        // Form ko reset karne ke liye
        this.resetForm();
        
      },
      error: (err) => {
        console.error('Failed to upload recipe:', err);
        this.toastService.showToast('error', 'Failed to upload recipe');

        // ✅ On failure, set the status to 'failed'
        this.uploadStatus = 'failed';
      },
    });
  }
}
import { Component, ElementRef, NgModule, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RecipeGenrateCardComponent } from '../../components/recipe-genrate-card/recipe-genrate-card.component';
import { ExploreRecipeComponent } from '../explore-recipe/explore-recipe.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { recipes } from '../../Data/full_recipes';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { AllRecipesService } from '../../services/allRecipes/all-recipes.service';
import { SaveRecipeService } from '../../services/saveRecipe/save-recipe.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule, RecipeGenrateCardComponent,   RecipeCardComponent, NgIf, NgFor,AboutUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  @ViewChild('heroHeading', { static: false }) heroHeadingRef!: ElementRef;
  @ViewChild('heroParagraph', { static: false }) heroParagraphRef!: ElementRef;

  slides = [
    {
      image: "assets/hero-1.jpg",
      heading: `Transform <span class="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Leftovers</span> into <br> <span class="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Delicious Meals</span>`,
      paragraph: "Apne paas maujood ajzaa se mazedar recipes daryaft karein. Hamara AI-powered recipe generator aapke bachay hue khane se lazeez pakwaan banane mein madad karta hai."
    },
    {
      image: "assets/hero-2.jpg",
      heading: `Cook <span class="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">Smarter</span>, Waste <br> <span class="bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text text-transparent">Less</span>`,
      paragraph: "Sustainable cooking se juri recipes explore karein. Hum aapko aise pakwaan banane mein madad karte hain jo na sirf lazeez hain balkay zayan bhi kam karte hain."
    },
    {
      image: "assets/hero-3.jpg",
      heading: `Fresh <span class="bg-gradient-to-r from-lime-500 to-green-500 bg-clip-text text-transparent">Ingredients</span>, <br> <span class="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">New Flavors</span>`,
      paragraph: "Taza ajzaa ka istemal karke nayi aur dilkash recipes banayen. Hum aapki pasandida sabziyon aur phalon ke hisab se behtareen pakwaan tajweez karte hain."
    }
  ];

  currentSlideIndex = signal(0);
  currentSlide = signal(this.slides[0]);




  ngAfterViewInit() {
    // Initial content update after view is initialized
    this.updateContent();
  }

  previousSlide() {
    const newIndex = (this.currentSlideIndex() - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(newIndex);
  }

  nextSlide() {
    const newIndex = (this.currentSlideIndex() + 1) % this.slides.length;
    this.goToSlide(newIndex);
  }

  goToSlide(index: number) {
    this.currentSlideIndex.set(index);
    this.currentSlide.set(this.slides[index]);
    this.updateContent();
  }


  startSlider() {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // Change image every 5 seconds
  }

  updateContent() {
    if (this.heroHeadingRef && this.heroParagraphRef) {
      this.heroHeadingRef.nativeElement.innerHTML = this.currentSlide().heading;
      this.heroParagraphRef.nativeElement.innerHTML = this.currentSlide().paragraph;
    }
  }

  // home.component.ts
  leftoverInput: string = '';
  cuisines: string[] = ['Italian', 'Chinese', 'Indian', 'Mexican', 'Pakistani'];

  generateRecipe() {
    // later call Express API here
    console.log('Generate recipe for:', this.leftoverInput);
  }

  getCuisineRecipes(type: string) {
    // later call Spoonacular API here
    console.log('Cuisine selected:', type);
  }




  constructor(private allRecipeService: AllRecipesService, private saveRecipeService: SaveRecipeService) { }

  errorMessage = ''
  recipes: any[] = [];
  popularRecipes: any[] = [];

  ngOnInit() {


    this.getRandomRecipes();

    this.startSlider();



  }

  getRandomRecipes() {
    this.allRecipeService.getSavedRecipes().subscribe({
      next: (data) => {
        this.recipes = data; // API ka data save karo
        console.log(this.recipes);

        // Yahin shuffle & slice karo (data milne ke baad)
        const shuffled = [...this.recipes].sort(() => 0.5 - Math.random());
        this.popularRecipes = shuffled.slice(0, 6); // ab sirf 6 recipes milengi
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Unauthorized or No Data';
      }
    });


    const token = localStorage.getItem('authToken');
    if (token) {
      // Jab page load ho to saved recipes ki list service mein daal dein
      this.saveRecipeService.loadSavedRecipes(token);
    }
  }


}

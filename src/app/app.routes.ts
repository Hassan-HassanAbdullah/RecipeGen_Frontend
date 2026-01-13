import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SaveRecipeComponent } from './pages/save-recipe/save-recipe.component';
import { ExploreRecipeComponent } from './pages/explore-recipe/explore-recipe.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { checkLoginGuard } from './guard/check-login.guard';
import { RecipeFormComponent } from './pages/recipe-form/recipe-form.component';
import { GenrateRecipeComponent } from './pages/genrate-recipe/genrate-recipe.component';



export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: 'recipe-detail', component: RecipeDetailComponent },
  { path: 'save-recipe', component: SaveRecipeComponent },
  { path: 'user-Profile', component: UserProfileComponent, canActivate: [checkLoginGuard] },
  { path: 'recipe-form', component: RecipeFormComponent, canActivate: [checkLoginGuard] },
  { path: 'genrate_recipy', component: GenrateRecipeComponent },
  {path: 'explore-recipe', component:ExploreRecipeComponent},
  {path:'aboutUs', component:AboutUsComponent},
  { path: '**', component: PageNotFoundComponent }
];




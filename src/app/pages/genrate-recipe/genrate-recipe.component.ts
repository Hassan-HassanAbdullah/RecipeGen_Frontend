import { Component } from '@angular/core';
import { RecipeGenrateCardComponent } from '../../components/recipe-genrate-card/recipe-genrate-card.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-genrate-recipe',
  imports: [RecipeGenrateCardComponent, FooterComponent],
  templateUrl: './genrate-recipe.component.html',
  styleUrl: './genrate-recipe.component.css'
})
export class GenrateRecipeComponent {

}

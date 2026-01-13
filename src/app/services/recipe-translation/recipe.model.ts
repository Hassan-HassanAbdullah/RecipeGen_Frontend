export interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  servings: string;
  estimatedCookingTime: string;
  cuisine: string;
  dishTypes: string;
  timeToPrepare: string;
  timeToCook: string;
  totalTime: string;
}

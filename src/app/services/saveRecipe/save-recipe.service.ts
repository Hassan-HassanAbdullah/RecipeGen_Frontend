import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';


// Interface jo backend ke response ka structure define karta hai
interface SaveRecipeResponse {
  message: string;
  saved: boolean;
  savedRecipes: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SaveRecipeService {

  private apiUrl = environment.recipeApiUrl; // Use the environment variable for API URL

  // New: BehaviorSubject to store saved recipe IDs
  private _savedRecipes = new BehaviorSubject<string[]>([]);
  savedRecipes$ = this._savedRecipes.asObservable();


  constructor(private http: HttpClient) { }



  // Initial data load ke liye method. ya sare save recipe ke id la kar aa ga 
  // Ye method aapko home page ya explore page ke ngOnInit mein call karna hoga.
  loadSavedRecipes(token: string) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this.http.get<any[]>(`${this.apiUrl}/get-save-recipe`, { headers }).pipe(
      tap(recipes => {
        const ids = recipes.map(recipe => recipe._id);
        this._savedRecipes.next(ids);
      }),
      catchError(err => {
        console.error('Error fetching saved recipes:', err);
        return of([]);
      })
    ).subscribe();
  }



  // toggle Save and unsave
  saveRecipe(recipeData: any, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // yeh token localStorage se milega
    });

    const currentIds = this._savedRecipes.value;
    const recipeId = recipeData.recipe._id;
    const isCurrentlySaved = currentIds.includes(recipeId);


    // Optimistic UI update
    const newIds = isCurrentlySaved
      ? currentIds.filter(id => id !== recipeId)
      : [...currentIds, recipeId];


    this._savedRecipes.next(newIds);

    return this.http.post<SaveRecipeResponse>(`${this.apiUrl}/save-recipe`, recipeData, { headers }).pipe(
      tap(res => {
        // Final state update from the backend's response.
        if (res && res.savedRecipes) {
          this._savedRecipes.next(res.savedRecipes);
        }
      }),
      catchError(err => {
        console.error('Failed to toggle recipe status:', err);
        // Error par state ko revert karein
        this._savedRecipes.next(currentIds);
        return of(null);
      })
    );

  }




  getSavedRecipes(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token login ke baad save hota hai
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/get-save-recipe`, { headers });
  }


  getSavedRecipesCount(): Observable<number> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/get-save-recipe`, { headers })
      .pipe(
        map((recipes) => recipes.length)  // sirf number bhejna
      );
  }

}

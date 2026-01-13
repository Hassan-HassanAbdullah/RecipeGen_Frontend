import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AllRecipesService {

  apiUrl= environment.recipeApiUrl

  constructor(private http: HttpClient) { }


  getSavedRecipes(): Observable<any> {


    return this.http.get<any>(`${this.apiUrl}/getRecipes`);
  }
}

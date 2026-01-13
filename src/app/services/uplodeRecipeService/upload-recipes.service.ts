import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadRecipesService {

  constructor(private http: HttpClient) { }


  private apiUrl = environment.recipeApiUrl; // Use the environment variable for API URL



  uploadRecipe(recipeData: any, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // yeh token localStorage se milega
    });

    return this.http.post(`${this.apiUrl}/upload-Recipe`, recipeData, { headers });
  }




  getUploadRecipes(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Token login ke baad save hota hai
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/get-Upload-Recipe`, { headers });
  }


  getUploadRecipesCount(): Observable<number> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/get-Upload-Recipe`, { headers })
      .pipe(
        map((recipes) => recipes.length) // sirf count bhejo
      );
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {

  constructor(private http: HttpClient) {}
  getRecipesByClientId(clientId: number): Observable<any> {
    const url = `http://localhost:8090/Recipe/getRecipesByClientId/${clientId}`;
    return this.http.get(url);
  }
  getRecipeById(recipeId: number) {
    const apiUrl = `http://localhost:8090/Recipe/getRecipeById/${recipeId}`;
    return this.http.get(apiUrl);
  }

  getPrListByRecipeId(recipeId: number) {
    const apiUrl = `http://localhost:8090/Recipe/getPr/${recipeId}`;
    return this.http.get(apiUrl);
  }

  //update recipe
  updateRecipe(id : any , path : any) {
    const apiUrl = `http://localhost:8090/Recipe/update/${id}`;
    return this.http.put(apiUrl, path);
  }
}

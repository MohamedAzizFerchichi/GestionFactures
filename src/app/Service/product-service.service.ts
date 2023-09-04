import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private apiUrl = 'http:///localhost:8090/Produit/all';
  constructor(private http: HttpClient) { }

  // Fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

}

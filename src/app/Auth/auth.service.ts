import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8090/api/user';
  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
}

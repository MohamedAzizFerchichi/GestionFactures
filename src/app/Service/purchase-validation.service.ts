import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseValidationService {
  private apiUrl = 'http://localhost:8090/api/user/purchase';
  private  api = "http:///localhost:8090/Recipe/MaxId"
  isPurchaseValid = false;
  constructor(private http: HttpClient) { }

  // Add methods to set and get the validation state as needed
  setValidationState(valid: boolean): void {
    this.isPurchaseValid = valid;
  }

  Purchase(data : any , iduser : number): Observable<any> {
    const params = new HttpParams().set('userId', iduser.toString());
    return this.http.post(this.apiUrl, data, { params });
  }

  Maxid() : Observable<any> 
  {
    return this.http.get(this.api);
  }
}

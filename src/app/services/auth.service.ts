import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5139'; // Adjust as per your backend URL

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/register`, user);
  }
  registerByAdmin(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/registerByAdmin`, user);
  }
  

  login(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/login`, user).pipe(
      tap((response:any) => {
        localStorage.setItem('token', response.token); 
        localStorage.setItem('username', response.firstName);
        localStorage.setItem('role', response.role); 
        
      })
    );
  }
}

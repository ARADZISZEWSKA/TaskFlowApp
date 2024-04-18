import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.post(`${this.baseUrl}/user/register`, user, {
      withCredentials: true // Ensure cookies are sent with requests
    });
  }

  registerByAdmin(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/registerByAdmin`, user, {
      withCredentials: true // Ensure cookies are sent with requests
    });
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/login`, user, {
      withCredentials: true // Important: include credentials to handle cookies
    }).pipe(
      tap((response: any) => {
        // Optionally handle light session data that doesn't include sensitive info
        localStorage.setItem('username', response.firstName);
        localStorage.setItem('role', response.role);
        
      })
    );
  }

  // logout(): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/user/logout`, {}, {
  //     withCredentials: true // Ensure cookies are sent to clear the session
  //   }).pipe(
  //     tap(() => {
  //       localStorage.removeItem('username');
  //       localStorage.removeItem('role');
  //       // Do not need to remove token since it's not stored in localStorage
  //     })
  //   );
  // }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5139/user'; 

  constructor(private http: HttpClient) { }

  getUsersByOwner(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/ownerOf`, { withCredentials: true })
      .pipe(
        catchError((error) => {
          console.error('Failed to get users by owner from backend:', error);
          return throwError(error); // or handle this error in a user-friendly way
        })
      );
  }





  //zostawiac?
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`, { withCredentials: true })
      .pipe(
        catchError((error) => {
          console.error('Failed to get users from backend:', error);
          return throwError(error); // or handle this error in a user-friendly way
        })
      );
  }
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
  }

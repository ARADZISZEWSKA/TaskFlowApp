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

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete`, { withCredentials: true })
      .pipe(
        catchError((error) => {
          console.error('Failed to delete user:', error);
          return throwError(error);
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


  //zmiana hasła
  changePassword(currentPassword: string, newPassword: string, confirmNewPassword: string): Observable<any> {
    const payload = {
      currentPassword,
      newPassword,
      confirmNewPassword
    };
   
    
    return this.http.post(`${this.baseUrl}/User/change-password`, payload);
  }
}

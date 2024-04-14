import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5139/user'; 

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return new Observable(observer => {
      this.http.get<User[]>(`${this.baseUrl}/users`).subscribe({
        next: (users) => {
          console.log('Received users from backend:', users);
          observer.next(users);
          observer.complete();
        },
        error: (error) => {
          console.error('Failed to get users from backend:', error);
          observer.error(error);
        }
      });
    });
  }
  
}

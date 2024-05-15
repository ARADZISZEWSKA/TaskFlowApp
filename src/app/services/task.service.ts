import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

private baseUrl = 'http://localhost:5139/tasks';
  constructor(private http: HttpClient) {}

  addTask(task: Task): Observable<Task>  {
    return this.http.post<Task>(`${this.baseUrl}/create`, task);
  }

  getTasksByUserAndProject(userId: string, projectId: string) {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}/project/${projectId}`);
  }

  getTodayTasksByProject(projectId: string): Observable<Task[]> {
    // Ustawienie opcji żądania, aby przekazywać ciasteczka
    const options = {
      withCredentials: true
    };

    // Utworzenie nagłówka z uwzględnieniem opcji żądania
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get<Task[]>(`${this.baseUrl}/project/${projectId}/today`, { headers, ...options });
  }
}

  




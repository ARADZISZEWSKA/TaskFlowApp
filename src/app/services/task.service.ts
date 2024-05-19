import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Task } from '../models/task.model';
import { TaskStatusResponse } from '../models/taskstatusresponse';


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


  getAllTasksByProject(projectId: string): Observable<Task[]> {
    // Ustawienie opcji żądania, aby przekazywać ciasteczka
    const options = {
      withCredentials: true
    };

    // Utworzenie nagłówka z uwzględnieniem opcji żądania
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get<Task[]>(`${this.baseUrl}/project/${projectId}/all-tasks`, { headers, ...options });
  }

  getAllTasksByProjectAdmin(projectId: string): Observable<Task[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    const options = {
      headers: headers,
      withCredentials: true
    };
  
    return this.http.get<Task[]>(`${this.baseUrl}/project/${projectId}/all-tasks-admin`, options);
  }

  updateTaskStatus(taskId: string, status: string): Observable<any> {
    const payload = { status }; // Object shorthand
    console.log("Sending payload:", JSON.stringify(payload)); // Debug payload
    return this.http.put(`${this.baseUrl}/update-status/${taskId}`, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
}

    archiveAndDeleteCompletedTasks(): Observable<any> {
      return this.http.post(`${this.baseUrl}/archive-and-delete-completed-tasks`, {});
    }


  
 

}
  


  
  
  


  




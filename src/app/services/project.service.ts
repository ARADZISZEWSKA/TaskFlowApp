// project.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/projects.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:5139/projects'; // Adjust as per your backend URL

  constructor(private http: HttpClient) { }

  getUserProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/userProjects`, {
      withCredentials: true
    });
  }

  // project.service.ts
    getUserProjectMembers(projectId: string): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}/${projectId}/members`, {
        withCredentials: true
        });
    }
  
}

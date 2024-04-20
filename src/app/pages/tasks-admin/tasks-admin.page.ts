import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-admin',
  templateUrl: './tasks-admin.page.html',
  styleUrls: ['./tasks-admin.page.scss'],
})
export class TasksAdminPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToSettingsAdmin(): void {
    this.router.navigateByUrl('/settings-admin'); 
  }

  goToTasksAdmin(): void {
    this.router.navigateByUrl('/tasks-admin'); 
  }

  goToAdminHomepage(): void {
    this.router.navigateByUrl('/admin-homepage'); 
  }

}

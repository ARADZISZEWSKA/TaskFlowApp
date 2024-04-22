import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  constructor(
    private router: Router
  ){}
  
  goToSettings(): void {
    this.router.navigateByUrl('/settings'); 
  }
  
  goToTasks(): void {
    this.router.navigateByUrl('/tasks'); 
  }
  
  goToHome(): void {
    this.router.navigateByUrl('/home'); 
  }

  ngOnInit() {
  }

}

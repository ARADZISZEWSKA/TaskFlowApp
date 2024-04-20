import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {


  ngOnInit() {
  }



//---Tab---
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

}

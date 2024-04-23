import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  private router: Router,
  private authService: AuthService
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


logout() {
  this.authService.logout().subscribe({
      next: (response) => {
          console.log('Wylogowano pomyślnie');
          this.router.navigateByUrl('/login');
      },
      error: (error) => {
          console.error('Błąd podczas wylogowywania', error);
      }
  });
}

}

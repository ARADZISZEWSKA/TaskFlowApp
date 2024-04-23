import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-settings-admin',
  templateUrl: './settings-admin.page.html',
  styleUrls: ['./settings-admin.page.scss'],
})
export class SettingsAdminPage implements OnInit {

  constructor(private router: Router,
    private authService: AuthService) { }

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

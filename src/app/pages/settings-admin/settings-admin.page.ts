import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settings-admin',
  templateUrl: './settings-admin.page.html',
  styleUrls: ['./settings-admin.page.scss'],
})
export class SettingsAdminPage implements OnInit {

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

  logout(): void {
    // Usuń dane użytkownika z local storage
    localStorage.removeItem('username');
    localStorage.removeItem('token'); // Przykładowe dane do usunięcia, możesz dodać inne w zależności od potrzeb

    // Po usunięciu danych przekieruj użytkownika do strony logowania
    this.router.navigateByUrl('/login');
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss'],
})
export class ManageUsersPage implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  isMobile: boolean = false;

  constructor(private userService: UserService, private platform: Platform, private router: Router,    private toastController: ToastController

  ) {
    this.isMobile = this.platform.is('mobile');

  }

  ngOnInit() {
    this.userService.getUsersByOwner().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data;
      this.isMobile = window.innerWidth <= 768;
    });
  }

  filterUsers(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredUsers = this.users.filter(user => {
      return (
        user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
    });
  }

  deleteUser(userId: string) {
    if (userId) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          console.log('User deleted');
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    } else {
      console.error('User ID is required');
    }
  }

  

  // Metoda do edycji użytkownika
  editUser(user: User) {
    // Tutaj możesz dodać logikę do edycji użytkownika
    console.log('Edycja użytkownika:', user);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
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

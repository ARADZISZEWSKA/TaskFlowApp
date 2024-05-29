import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';


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

  constructor(
    private userService: UserService,
    private platform: Platform, 
    private router: Router,    
    private toastController: ToastController,
    private modalController: ModalController

  ) {
    this.isMobile = this.platform.is('mobile');

  }

  ngOnInit() {
    this.userService.getUsersByOwner().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data;
      this.isMobile = window.innerWidth <= 768;
    });
    this.loadUsers();

  }

  loadUsers() {
    this.userService.getUsersByOwner().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data;
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
          this.presentToast('User deleted successfully');
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    } else {
      console.error('User ID is required');
    }
  }

  

  async openEditUserModal(user: User) {
    const modal = await this.modalController.create({
      component: EditUserModalComponent,
      componentProps: {
        id: user.id,
        onModalDismiss: () => this.loadUsers()
      }
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data?.success) {
      this.loadUsers(); // Odśwież listę użytkowników, jeśli modal został zamknięty pomyślnie
    }
    
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


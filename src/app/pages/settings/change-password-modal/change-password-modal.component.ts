import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service'; // Upewnij się, że ścieżka jest poprawna

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
})
export class ChangePasswordModalComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(
    private modalController: ModalController,
    private userService: UserService
  ) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  async changePassword() {
    console.log(this.newPassword)
    console.log(this.confirmNewPassword)
    if (this.newPassword === this.confirmNewPassword) {
      this.userService.changePassword(this.currentPassword, this.newPassword, this.confirmNewPassword).subscribe(
        response => {
          console.log('Password changed successfully', response);
          this.dismissModal();
        },
        error => {
          console.error('Error changing password', error);
        }
      );
    } else {
      console.log('Passwords do not match');
    }
  }
}
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-admin-password-modal',
  templateUrl: './change-admin-password-modal.component.html',
  styleUrls: ['./change-admin-password-modal.component.scss'],
})
export class ChangeAdminPasswordModalComponent {
  currentPassword: string = ''; // Initialize to empty string
  newPassword: string = '';      // Initialize to empty string
  confirmNewPassword: string = ''; // Initialize to empty string

  constructor(
    private modalController: ModalController,
    private userService: UserService // Corrected spelling here
  ) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  async changePassword() {
    console.log(this.newPassword);
    console.log(this.confirmNewPassword);
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


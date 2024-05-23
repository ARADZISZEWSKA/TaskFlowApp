import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
})
export class ChangePasswordModalComponent {
  currentPassword: string = ''; // Initialize to empty string
  newPassword: string = '';      // Initialize to empty string
  confirmNewPassword: string = ''; // Initialize to empty string

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  changePassword() {
    if (this.newPassword === this.confirmNewPassword) {
      // Add your password change logic here
      console.log('Password changed successfully');
      this.dismissModal();
    } else {
      console.log('Passwords do not match');
    }
  }
}

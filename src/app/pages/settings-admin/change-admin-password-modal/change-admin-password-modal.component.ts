import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-change-admin-password-modal',
  templateUrl: './change-admin-password-modal.component.html',
  styleUrls: ['./change-admin-password-modal.component.scss'],
})
export class ChangeAdminPasswordModalComponent  {
  currentPassword: string = ''; // Initialize to empty string
  newPassword: string = '';      // Initialize to empty string
  confirmNewPassword: string = ''; // Initialize to empty string
  //nie wiem ??

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


import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../../models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register-user-modal',
  templateUrl: './register-user-modal.component.html',
  styleUrls: ['./register-user-modal.component.scss'],
})
export class RegisterUserModalComponent implements OnInit {
  public progress = 0;
  user: User = new User();


  constructor(
    private modalController: ModalController, 
    private http: HttpClient,
    private authService: AuthService,
    private router: Router, 
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }
  

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss();
  }

  async registerByAdmin() {
    

    const loading = await this.loadingController.create({
      message: 'Creating a new user...',
      cssClass: 'custom-loading'
    });
  
    if (!this.user.isValidEmail()) {
      this.presentAlert('Invalid Email', 'Please provide a valid email address.');
    } else if (!this.user.isValidPassword()) {
      this.presentAlert('Invalid Password', 'Password must be at least 8 characters long.');
    } else if (!this.user.isValidName()) {
      this.presentAlert('Invalid Name', 'Please provide both first and last name.');
    } else if (!this.user.passwordsMatch()) {
      this.presentAlert('Password Mismatch', 'Passwords do not match.');
    } else {
      await loading.present();
      this.authService.registerByAdmin(this.user).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          loading.dismiss();
          this.modalController.dismiss();
        },
        error: (error) => {
          console.error('Registration failed', error);
          loading.dismiss();
          this.presentAlert('Registration Failed', 'Error during registration');
        }
      });
    }
  }
  
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  
  updateProgress() {
    this.progress += 0.25;
    if (this.progress > 1) {
      this.progress = 1;
    }
  }
}


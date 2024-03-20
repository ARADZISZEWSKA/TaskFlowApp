import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage {

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
  
  user: User = new User();
  confirmPassword: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private alertController: AlertController
  ) { }


  register(): void {

    if (this.user.isValidUser() && (this.user.password === this.confirmPassword)) {

      this.authService.register(this.user).subscribe(
        response => {
          console.log('Registration successful', response);
          this.presentAlert('Registration Successful', 'Welcome to TaskFlow App', 'Your account has been created successfully.', true);
        },
        error => {
          console.error('Registration failed:', error);
          if (error.error === "User already exists.") {
            this.presentAlert('Registration Failed', 'User Already Exists', 'An account with this email already exists.', false);
          } else {
            this.presentAlert('Registration Failed', 'Error', 'An unexpected error occurred.', false);
          }
        }
      ); 
    } else {
      // Logika obsługi błędów walidacji
      this.presentAlert('Registration Failed', 'Invalid Data', 'Please check the provided information.', false);
    }
  }

  goToLogin(): void {
    this.router.navigateByUrl('/login'); 
  }

  async presentAlert(header: string, subHeader: string, message: string, isSuccess: boolean) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: isSuccess ? [{
        text: 'OK',
        handler: () => {
          this.router.navigateByUrl('/login'); // Redirect to login page on success
        }
      }] : ['OK']
    });

    await alert.present();
  }
}

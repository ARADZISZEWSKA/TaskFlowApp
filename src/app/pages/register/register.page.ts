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

  //counter for the password(from ionic)
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
  
  user: User = new User();
  

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private alertController: AlertController
  ) { }


  register(): void {
    let errorMessage = '';
    
  // The validations prevent invalid requests from reaching the server, saving server resources
    if (!this.user.isValidEmail()) {
      errorMessage = 'Please provide a valid email address.';
    } else if (!this.user.isValidPassword()) {
      errorMessage = 'Password must be at least 8 characters long.';
    } else if (!this.user.isValidName()) {
      errorMessage = 'Please provide a valid first and last name.';
    } else if (!this.user.passwordsMatch()) {
      errorMessage = 'Passwords do not match.';
    }
  
    if (errorMessage) {
      this.presentAlert('Registration Failed', 'Invalid Data', errorMessage, false);
      return;
    }
  
    this.authService.register(this.user).subscribe(
      response => {
        console.log('Registration successful', response);
        this.presentAlert('Registration Successful', 'Welcome to TaskFlow App', 'Your account has been created successfully.', true);
      },
      error => {
        console.error('Registration failed:', error);
        errorMessage = error.error === "User already exists." ? 'An account with this email already exists.' : 'An unexpected error occurred.';
        this.presentAlert('Registration Failed', 'Error', errorMessage, false);
      }
    );
  }
  

  goToLogin(): void {
    this.router.navigateByUrl('/login'); 
  }

  //creates and presents an Ionic alert with custom messages
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

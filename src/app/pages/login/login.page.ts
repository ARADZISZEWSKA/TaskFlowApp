import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user: User = new User();
  loginError: string = ''; 

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private alertController: AlertController) { }

  //uses the authService to call the login function, passing in the user data (email and password)
  login() {
    this.authService.login(this.user).subscribe(
      response => {
        console.log(response);
        //Navigate to a dashboard page on successful login
        this.router.navigateByUrl('/home');
      },
      // if login fails
      async error => {
        console.error(error);
        this.loginError = 'Login failed. Please check your credentials.';
  
        // Present an alert with the error message
        const alert = await this.alertController.create({
          header: 'Login Error',
          message: this.loginError,
          buttons: ['OK']
        });
  
        await alert.present();
      }
    );
  }
  goToRegister(): void {
    this.router.navigateByUrl('/register'); 
  }
}

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
        const role = response.role; // Odczytaj rolę z odpowiedzi

        //OD STORNY BACKENDU TEŻ MUSI BYĆ WALIDACJA!!!!!!!!!!!!!!
        // Zapisz rolę w lokalnym magazynie
        localStorage.setItem('role', role);

        // Sprawdź rolę i przekieruj odpowiednio
        if (role === 'admin') {
          this.router.navigateByUrl('/admin-homepage');  // Strona główna dla administratora
        } else {
          this.router.navigateByUrl('/home');  // Strona główna standardowego użytkownika
        }
      },
      async error => {
        console.error(error);
        this.loginError = 'Login failed. Please check your credentials.';
    
        // Prezentuj alert z komunikatem o błędzie
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

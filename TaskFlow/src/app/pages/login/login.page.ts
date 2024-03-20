import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user: User = new User();

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.user).subscribe(
      response => {
        console.log(response);
        //Navigate to a dashboard page on successful login
        this.router.navigateByUrl('/home');
      },
      error => {
        console.error(error);
        // logic to display error message
      }
    );
  }
  goToRegister(): void {
    this.router.navigateByUrl('/register'); 
  }
}

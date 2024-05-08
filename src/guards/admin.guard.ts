// admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../app/services/auth.service'; // Serwis autentykacji, który zawiera logikę sprawdzania zalogowania użytkownika i jego roli
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn() && this.authService.isUserAdmin()) {
      return true; // Użytkownik jest zalogowany i ma rolę admina, więc pozwól na dostęp
    } else {
      // Przekieruj użytkownika do strony logowania lub innej strony, jeśli nie jest zalogowany lub nie ma odpowiedniej roli
      this.router.navigate(['/login']); 
      return false;
    }
  }
}


//user.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../app/services/auth.service'; // Serwis autentykacji, który zawiera logikę sprawdzania zalogowania użytkownika i jego roli
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      if (!this.authService.isUserAdmin()) {
        return true; // Użytkownik jest zalogowany i ma rolę admina, więc pozwól na dostęp
      } else {
        // Użytkownik jest zalogowany, ale nie ma roli admina, więc przekieruj go do odpowiedniej strony dla użytkownika
        const adminRoute = this.getAdminRouteForState(state);
        this.router.navigate([adminRoute]); 
        return false;
      }
    } else {
      // Użytkownik nie jest zalogowany, więc przekieruj go do /login
      this.router.navigate(['/login']); 
      return false;
    }
  }
  
  private getAdminRouteForState(state: RouterStateSnapshot): string {
    // Mapuj odpowiednie trasy dla użytkownika w zależności od aktualnego stanu routingu
    const stateUrl = state.url;
    const adminRoutesMap: { [userRoute: string]: string } = {
      '/settings': '/settings-admin',
      '/tasks': '/tasks-admin',
      '/home': '/admin-homepage'

      // Dodaj inne trasy z mapą dla innych tras
    };
    return adminRoutesMap[stateUrl] || '/admin-homepage'; // Domyślnie przekieruj na /home, jeśli trasa nie jest zmapowana
  }
  }
  

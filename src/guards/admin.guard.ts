
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

 /* canActivate(
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
*/
canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  if (this.authService.isLoggedIn()) {
    if (this.authService.isUserAdmin()) {
      return true; // Użytkownik jest zalogowany i ma rolę admina, więc pozwól na dostęp
    } else {
      // Użytkownik jest zalogowany, ale nie ma roli admina, więc przekieruj go do odpowiedniej strony dla użytkownika
      const userRoute = this.getUserRouteForState(state);
      this.router.navigate([userRoute]); 
      return false;
    }
  } else {
    // Użytkownik nie jest zalogowany, więc przekieruj go do /login
    this.router.navigate(['/login']); 
    return false;
  }
}

private getUserRouteForState(state: RouterStateSnapshot): string {
  // Mapuj odpowiednie trasy dla użytkownika w zależności od aktualnego stanu routingu
  const stateUrl = state.url;
  const userRoutesMap: { [adminRoute: string]: string } = {
    'settings-admin': 'settings',
    'tasks-admin': 'tasks',
    'admin-homepage': 'home'
    // Dodaj inne trasy z mapą dla innych tras
  };
  return userRoutesMap[stateUrl] || '/home'; // Domyślnie przekieruj na /home, jeśli trasa nie jest zmapowana
}
}

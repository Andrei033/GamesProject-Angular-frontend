import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn$()) { // Check if user is logged in using the observable
      // Check for token expiration
      this.authService.checkTokenExpiration();
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

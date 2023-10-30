import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    // Check for a token in localStorage during initialization
    const token = localStorage.getItem('userToken');

    if (token) {
      // Check if the token is still valid (not expired)
      if (this.isTokenValid(token)) {
        // Set the authentication state to 'true'
        this.isAuthenticatedSubject.next(true);
      }
    }
  }

  // Method to check if a token is valid (not expired)
  private isTokenValid(token: string): boolean {
    // Implement your token validation logic here
    // Check token expiration, signature, etc.
    // Return true if the token is valid; otherwise, return false
    return true; // Example: always consider the token as valid
  }

  isLoggedIn$() {
    return this.isAuthenticatedSubject.asObservable();
  }

  storeJwt(token: string, expiration: number) {
    // Store the token and its expiration date
    localStorage.setItem('userToken', token);
    localStorage.setItem('userTokenExpiration', expiration.toString());
  }

  login(token: string, expiration: number) {
    this.isAuthenticatedSubject.next(true);
    this.storeJwt(token, expiration);
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
    // Remove stored user information, including the token
    localStorage.removeItem('userToken');
    localStorage.removeItem('userTokenExpiration');
  }
}

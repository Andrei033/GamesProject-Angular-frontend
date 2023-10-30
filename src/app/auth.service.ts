import { Injectable } from '@angular/core';
import { BehaviorSubject , Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  /*public isLoggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }*/
  isLoggedIn$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  checkTokenExpiration() {
    const expiration = localStorage.getItem('userTokenExpiration');
    if (expiration) {
      const expirationDate = new Date(expiration).getTime();
      const currentTime = new Date().getTime();

      if (currentTime > expirationDate) {
        // Token has expired; log the user out
        this.logout();
      }
    }
  }


  login() {
    this.isAuthenticatedSubject.next(true);
  }
  logout() {
    this.isAuthenticatedSubject.next(false);
  }
}

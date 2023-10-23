import { Injectable } from '@angular/core';
import { BehaviorSubject , Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  login() {
    this.isLoggedIn.next(true);
  }
  logout() {
    this.isLoggedIn.next(false);
  }
}

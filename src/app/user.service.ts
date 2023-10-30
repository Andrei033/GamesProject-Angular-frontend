import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registerUser(user: User) {
    return this.http.post(`${this.baseUrl}/user/register`, user);
  }

  loginUser(user: User) {
    return this.http.post(`${this.baseUrl}/user/login`, user);
  }

  // Add other user-related methods as needed
}






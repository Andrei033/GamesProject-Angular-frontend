import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false;

  constructor(private router: Router, public authService: AuthService, private userService: UserService) {}

  ngOnInit() {
    // Subscribe to the isLoggedIn$ observable
    this.authService.isLoggedIn$().subscribe(isLoggedIn => {
      console.log('Login Component - isLoggedIn$ state changed:', isLoggedIn);
      this.isLoggedIn = isLoggedIn;
    });
  }

  onSubmit() {
    const user = { email: this.email, password: this.password };

    this.userService.loginUser(user).subscribe(
      (response: any) => {
        // Successful login
        const token = response.token;

        // Pass the token to the AuthService to update the authentication state
        this.authService.login(token, Date.now() + 24 * 60 * 60 * 1000); // Assuming a token expiration of 24 hours

        // Redirect to the home page or any desired route
        this.router.navigate(['']);
      },
    );
  }
  logout() {
    // Log out logic
    this.authService.logout();

    // Redirect to the login page or any desired route
    
  }
}

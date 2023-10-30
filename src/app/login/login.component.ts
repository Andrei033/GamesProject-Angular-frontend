import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  httpOptions: any;
  constructor(private router: Router , public authService: AuthService,private userService: UserService) {}
  

  onSubmit() {
    const user = { email: this.email, password: this.password };
  
    this.userService.loginUser(user).subscribe({
      next: (response: any) => {
        // Successful login
        const token = response.token;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
        
      });

      // Store the token in local storage
      localStorage.setItem('userToken', token);
      
      // Set the headers for future requests
      this.httpOptions = { headers: headers };

      this.handleLoginSuccess(response);
      },
      error: (error: any) => {
        // Failed login
        alert('Login failed. Please check your credentials.');
        console.error(error);
      },
    });
  }
  
  

  private handleLoginSuccess(response: { token: string }) {
    // Store the user information securely and set an expiration (24 hours in milliseconds)
    const expirationDate = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours
    localStorage.setItem('userEmail', this.email);
    localStorage.setItem('userToken', response.token);
    localStorage.setItem('userTokenExpiration', expirationDate.toString());

    // Set user authentication state in your AuthService
    this.authService.login();

    // Redirect to the home page or any desired route
    this.router.navigate(['']);
  }

  logout() {
    // Log out logic
    this.authService.logout();

    // Remove stored user information
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userTokenExpiration');

    // Perform any necessary logout actions
  }
}

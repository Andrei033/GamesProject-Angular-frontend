import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router , public authService: AuthService) {}
  

  onSubmit() {
    // Simulate authentication (replace with actual authentication logic)
    if (this.username === 'user' && this.password === 'user') {
      // Successful login, set a user authentication state
      this.authService.login();
      this.router.navigate(['']);
    } else {
      // Failed login, show an error message or handle it as needed
      alert('Login failed. Please check your credentials.');
      console.log('Username:', this.username);
  console.log('Password:', this.password);
    }
  }

  private setAuthenticatedUserState() {
    // You can use a service or some state management mechanism to track user authentication.
    // For simplicity, we'll use a local variable in this example.
    localStorage.setItem('authenticated', 'true');
  }

  logout() {
    // Log out logic
    this.authService.logout();
    // Perform any necessary logout actions
  }
}

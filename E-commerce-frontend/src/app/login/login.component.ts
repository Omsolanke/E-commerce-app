import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userName = '';
  userPassword = '';

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  loginUser() {
    if (this.userName.trim() === '' || this.userPassword.trim() === '') {
      alert('Username and Password are required!');
      return;
    }

    const loginData = {
      userName: this.userName,
      userPassword: this.userPassword
    };

    this.userService.login(loginData).subscribe({
      next: (response: any) => {

        console.log('API Response:', response);

        if (!response.jwtToken || !response.user || !response.user.role) {
          alert('Invalid server response. Please check backend.');
          return;
        }

        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        const role = response.user.role[0]?.roleName;
        console.log('User Role:', role);

        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else if (role === 'User') {
          this.router.navigate(['/user']);
        } else {
          alert('Unknown role detected!');
        }
      },
      error: (err) => {
        console.error('Login Failed', err);
        if (err.status === 401) {
          alert('Invalid Credentials!');
        } else {
          alert('An error occurred during login.');
        }
      }
    });
  }
  registerUser() {
    this.router.navigate(['/register']);
  }
}

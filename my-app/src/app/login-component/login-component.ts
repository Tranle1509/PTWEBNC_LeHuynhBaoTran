import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../classes/UserLogin';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  user = new UserLogin();
  loginError = '';

  constructor(private router: Router) {}

  onLogin(): void {
    if (this.user.username !== '123' || this.user.password !== '123') {
      localStorage.setItem('isLoggedIn', 'false');
      this.loginError = 'Username hoặc password không đúng. Hãy dùng 123 / 123.';
      return;
    }

    this.loginError = '';
    localStorage.setItem('isLoggedIn', 'true');
    if (this.user.rememberMe) {
      localStorage.setItem('loginUser', this.user.username);
    }
    this.router.navigate(['/search-products']);
  }

  onLogout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginUser');
    localStorage.setItem('isLoggedIn', 'false');
    this.user = new UserLogin();
    this.router.navigate(['/login']);
  }
}



import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('loginForm', { static: false }) loginForm!: NgForm;
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showError: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  login(loginForm: NgForm): void {
    if (this.loginForm && this.loginForm.invalid) {
      return;
    }

    if (this.username === 'admin') {
      if (this.userService.isPasswordChangeRequired(this.username)) {
        this.router.navigate(['/password-change']);
      } else {
        this.router.navigate(['/home']);
      }
    } else {
      const isValidUser = this.userService.validateUser(this.username, this.password);

      if (isValidUser) {
        this.router.navigate(['/home']);
      } else {
this.showError = true;
      }
    }
  }
}

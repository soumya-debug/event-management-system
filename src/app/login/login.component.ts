
import { Component, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('errorMessage', { static: false }) errorMessage!: ElementRef;
  username: string = ''; // Add default value for the username property
  password: string = ''; // Add default value for the password property
  rememberMe: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  login(loginForm: NgForm): void {
    if (loginForm.invalid) {
      return;
    }
    // Check if the user is an admin
    if (this.username === 'admin') {
      // Check if the password change is required
      if (this.userService.isPasswordChangeRequired(this.username)) {
        // Redirect to the password change page
        this.router.navigate(['/password-change']);
      } else {
        // Redirect to the desired page after successful login
        this.router.navigate(['/home']);
      }
    } else {
      // Check if the username and password are valid
      const isValidUser = this.userService.validateUser(
        this.username,
        this.password
      );

      if (isValidUser) {
        // Redirect to the desired page after successful login
        this.router.navigate(['/home']);
      } else {
        // Display an error message for invalid credentials
        this.errorMessage.nativeElement.textContent = 'Invalid username or password.';
      }
    }
  }
}

import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css'],
})
export class PasswordChangeComponent {
  @ViewChild('passwordChangeForm', { static: false })
  passwordChangeForm!: NgForm;
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordsMismatch: boolean = false;
  emailValidated: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService) {}

  validateEmail(): void {
    // Check if the email exists in the signup page data
    const isEmailValid = this.userService.isEmailExists(this.email);

    if (isEmailValid) {
      // Display success message
      this.successMessage = 'Email validated successfully.';
      this.emailValidated = true;
    } else {
      // Display error message
      this.errorMessage = 'Email does not exist.';
      this.emailValidated = false;
    }
  }

  changePassword(): void {
    // Check if the email is validated
    if (!this.emailValidated) {
      this.errorMessage = 'Please validate your email first.';
      return;
    }

    // Check if the new passwords match
    if (this.newPassword !== this.confirmPassword) {
      this.passwordChangeForm.controls['confirmPassword'].markAsTouched();
      this.passwordsMismatch = true;
      return;
    }

    // Change the password
    this.userService.changePassword(this.email, this.newPassword);

    // Display success message
    this.successMessage = 'Password changed successfully.';

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}

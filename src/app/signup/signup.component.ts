import { Component } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  signup(): void {
    // Check if the form is valid
    if (this.signupForm.invalid) {
      // Set error message and return
      this.errorMessage = 'Error: Invalid form data.';
      return;
    }

    // Check if any field is empty
    const { username, email, password } = this.signupForm.value;
    if (!username || !email || !password) {
      this.errorMessage = 'Error: All fields are required.';
      return;
    }

    // Check if the email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.errorMessage = 'Error: Invalid email format.';
      return;
    }

    // Check if the password meets the minimum requirements (e.g., at least 8 characters)
    if (password.length < 8) {
      this.errorMessage = 'Error: Password must be at least 8 characters long.';
      return;
    }

    // Create a new user object
    const newUser = {
      username,
      email,
      password,
    };

    // Call the userService method to check for duplicate username or email
    if (!this.userService.isUniqueUser(newUser)) {
      this.errorMessage = 'Error: Account already exists.';
      return;
    }

    // Call the userService method to store the user data
    this.userService.addUser(newUser);

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}

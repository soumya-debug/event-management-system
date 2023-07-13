import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: any[] = [];
  passwordChangeRequired: boolean = true; // Default value for password change requirement

  constructor() {}

  isUniqueUser(newUser: any): boolean {
    // Check if the username or email already exists
    const existingUser = this.users.find(
      (user) =>
        user.username === newUser.username || user.email === newUser.email
    );

    return !existingUser; // Return true if the user is unique, false otherwise
  }

  addUser(user: any): void {
    this.users.push(user); // Add the new user to the list
  }

  isPasswordChangeRequired(username: string): boolean {
    // Implement the logic to check if password change is required for the given username
    // You can use the username parameter to identify the admin user
    // ...

    return this.passwordChangeRequired; // Return the password change requirement status
  }

  validateUser(username: string, password: string): boolean {
    // Find the user with the matching username
    const user = this.users.find((user) => user.username === username);

    // Check if the user exists and the password matches
    if (user && user.password === password) {
      return true; // Credentials are valid
    }

    return false; // Credentials are invalid
  }

  changePassword(email: string, newPassword: string): void {
    // Find the user with the matching email
    const user = this.users.find((user) => user.email === email);

    // Update the user's password
    if (user) {
      user.password = newPassword;
    }

    // Reset the password change requirement
    this.passwordChangeRequired = false;
  }

  isEmailExists(email: string): boolean {
    // Check if the email exists in the signup page data
    const existingUser = this.users.find((user) => user.email === email);
    return !!existingUser; // Return true if the email exists, false otherwise
  }
}

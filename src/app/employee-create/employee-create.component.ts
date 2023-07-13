import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent {
  employeeForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.employeeForm = this.formBuilder.group({
      id: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      return;
    }

    const newEmployee = this.employeeForm.value;

    this.http.post('http://localhost:3000/employees', newEmployee)
      .subscribe(
        () => {
          this.errorMessage = null;
          this.router.navigate(['/employees']);
        },
        (error) => {
          if (error.status === 409) {
            this.errorMessage = 'Employee with the same ID already exists';
            this.successMessage = null;
          } else {
            this.errorMessage = 'Error occurred, Please check the id confliction !';
            this.successMessage = null;
          }
        }
      );
  }
}

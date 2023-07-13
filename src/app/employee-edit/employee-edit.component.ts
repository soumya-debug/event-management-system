import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employee: any = {}; // Initialize employee object

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const employeeId = +params['id'];
      this.getEmployeeDetails(employeeId);
    });
  }

  getEmployeeDetails(employeeId: number) {
    this.http.get<any>(`http://localhost:3000/employees/${employeeId}`)
      .subscribe(
        (employee) => {
          this.employee = employee;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  updateEmployee() {
    this.http.put(`http://localhost:3000/employees/${this.employee.id}`, this.employee)
      .subscribe(() => {
        this.goToEmployeeDetails();
      });
  }

  goToEmployeeDetails() {
    const employeeId = this.employee.id;
    this.router.navigate(['/employees', employeeId]);
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
}

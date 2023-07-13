import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.http.get<any[]>('http://localhost:3000/employees')
      .subscribe(employees => {
        this.employees = employees;
      });
  }

  navigateToCreateEmployee() {
    this.router.navigate(['/employees/create']);
  }

  viewDetails(employeeId: number) {
    this.router.navigate(['/employees/', employeeId]);
  }
}

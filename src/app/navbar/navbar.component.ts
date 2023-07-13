import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('employeeDetailsModal') employeeDetailsModal!: ElementRef;
  @ViewChild('employeeNotFoundModal') employeeNotFoundModal!: ElementRef;
  employeeId: string = '';
  employeeName: string = '';
  employeeEmail: string = '';
  searchText: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  searchEmployees() {
    this.http
      .get<any[]>(
        `http://localhost:3000/employees?q=${this.searchText}&_sort=last_name`
      )
      .subscribe(
        (response) => {
          console.log('Server Response:', response);
          if (response.length > 0) {
            const employee = response[0];
            this.employeeId = employee.id;
            this.employeeName = `${employee.first_name} ${employee.last_name}`;
            this.employeeEmail = employee.email;
            this.showEmployeeDetailsModal();
          } else {
            this.employeeId = '';
            this.employeeName = '';
            this.employeeEmail = '';
            this.showEmployeeNotFoundModal();
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  showEmployeeDetailsModal() {
    const modalElement: HTMLElement = this.employeeDetailsModal.nativeElement;
    modalElement.classList.add('show');
    modalElement.style.display = 'block';
  }

  hideEmployeeDetailsModal() {
    const modalElement: HTMLElement = this.employeeDetailsModal.nativeElement;
    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
  }

  // Add the show and hide methods for the employee not found modal
  showEmployeeNotFoundModal() {
    const modalElement: HTMLElement = this.employeeNotFoundModal.nativeElement;
    modalElement.classList.add('show');
    modalElement.style.display = 'block';
  }

  hideEmployeeNotFoundModal() {
    const modalElement: HTMLElement = this.employeeNotFoundModal.nativeElement;
    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const employeeId = +params['id'];
      this.getEmployeeDetails(employeeId);
    });
  }

  getEmployeeDetails(employeeId: number) {
    this.http.get<any>(`http://localhost:3000/employees/${employeeId}`)
      .subscribe(employee => {
        this.employee = employee;
      });
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  deleteEmployee() {
    this.modalService.open(this.deleteConfirmationModal).result.then((result) => {
      // Delete confirmed, perform delete operation
      if (result === 'delete') {
        const employeeId = this.employee.id;
        this.http.delete(`http://localhost:3000/employees/${employeeId}`)
          .subscribe(() => {
            this.goToEmployeeList();
          });
      }
    }, (dismissReason) => {
      // Dismissed without confirmation
    });
  }

  confirmDelete() {
    // Perform the delete operation
    const employeeId = this.employee.id;
    this.http.delete(`http://localhost:3000/employees/${employeeId}`)
      .subscribe(() => {
        this.goToEmployeeList();
      });
  }

  goToUpdateEmployee() {
    const employeeId = this.employee.id;
    this.router.navigate(['/employees', employeeId, 'edit']);
  }
}

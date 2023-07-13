import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'password-change', component: PasswordChangeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/create', component: EmployeeCreateComponent },
  { path: 'employees/:id', component: EmployeeDetailsComponent },
  { path: 'employees/:id/edit', component: EmployeeEditComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

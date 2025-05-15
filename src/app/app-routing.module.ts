import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AttendanceComponent } from './components/Attendance1/attendance/attendance.component';
import { DashboardComponent } from './dashboard/dashboard.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'students', component: StudentListComponent ,canActivate:[AuthGuard]},
  { path: 'students/add', component: StudentFormComponent,canActivate:[AuthGuard] },
  { path: 'teachers', loadChildren: () => import('./components/teacher/teacher.module').then(m => m.TeacherModule),canActivate:[AuthGuard] },
  {path:'courses', loadChildren:()=>import('./components/course/course.module').then(m=>m.CourseModule),canActivate:[AuthGuard]},
  {path:'attendance',loadChildren:()=>import('./components/Attendance1/attendance.module').then(m=>m.AttendanceModule),canActivate:[AuthGuard]},
  {path: 'dashboard',component:DashboardComponent,canActivate:[AuthGuard]}, 
  { path: '**', redirectTo: 'login' } ,

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

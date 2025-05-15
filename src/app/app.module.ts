import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentFormModule } from './components/student-form/student-form.module';
import { StudentListModule } from './components/student-list/student-list.module';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar.component';
import { TeacherModule } from './components/teacher/teacher.module';
import { CourseModule } from './components/course/course.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendanceModule } from './components/Attendance1/attendance.module';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StudentFormModule,
    StudentListModule,
    RouterModule,
    AuthModule,
    HttpClientModule,
    TeacherModule,
    CourseModule,
    ReactiveFormsModule,
    FormsModule,
    AttendanceModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

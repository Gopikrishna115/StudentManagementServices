import { Component } from '@angular/core';
import { Attendance, Course, Student, StudentService, Teacher } from '../services/student.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  students: Student[] = [];
  Teachers: Teacher[] = [];
  Courses: Course[] = [];
  attendanceList: Attendance[] = [];
  teachercount: number = 0;
  coursecount: number = 0;
  studentcount: number = 0;
  todaystudentcount: number = 0;
  todayDate: string = new Date().toISOString().split('T')[0];

  constructor(private studentservice: StudentService,private route:Router) {
    this.loadDashboardData();
  }

  loadDashboardData() {
   
    this.studentservice.getStudents().subscribe(res => {
      this.students = res;
      this.studentcount = this.students.length;
    });


    this.studentservice.getTeachers().subscribe(res => {
      this.Teachers = res;
      this.teachercount = this.Teachers.length;
    });

   
    this.studentservice.getCourses().subscribe(res => {
      this.Courses = res;
      this.coursecount = this.Courses.length;
    });


    this.studentservice.getAttendance(undefined, undefined, this.todayDate).subscribe(res => {
      this.attendanceList = res;
      this.todaystudentcount = this.attendanceList.filter(x => x.status === 'Present').length;
    });
  }

  GetStudentName(id:any){
    return this.students.find(x=>x.studentID==id)?.name || "Student";
  }
  GetCourseName(id:any){
   return this.Courses.find(x=>x.courseID==id)?.courseName || "Course";
  }

  ViewAll(){
    this.route.navigateByUrl('/attendance/report');
  }

}

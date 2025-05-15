import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { Attendance, Course, Student, StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent {

 courses : Course[] = [];
  attendanceTypes = ['Students', 'Teachers'];
  selectedCourse :number =0;
  selectedType = 'Students';
  attendanceDate = new Date().toISOString().split('T')[0];
  students:any[]=[];
  attendances:Attendance[]=[];

  constructor(private studentservicee:StudentService,private route:Router)
  {
    this.studentservicee.getCourses().subscribe((res)=>{
    this.courses = res;
    });

  }
  takeAttendance(){
    this.studentservicee.getStudentbyCId(this.selectedCourse).subscribe((res)=>{
    (res as any[]).map(x=>x.status='');
    this.students = res;
    this.attendances = [];
    });
  }

  markAttendance(studentId: number, status: string) {
    const student = this.students.find((s) => s.studentID === studentId);
    if (student) {
      student.status = status;
      const attendance= this.attendances.find(x=>x.studentID ==studentId);
      if(attendance){
         attendance.status = status;
      }
      else{
      this.attendances.push(
        {
          "attendanceID": 0,
          "studentID": student.studentID,
          "courseID": this.selectedCourse,
          "attendanceDate": new Date(this.attendanceDate),
          "status": status,
          "createdAt": new Date()
        }
      )
    }
    } 
  }
  saveRecord() {
    if(this.students.find(x=>x.status == '')){
      alert('please mark all student attendance');
      return;
    }
    console.log('Attendance Record:', this.attendances);
    this.studentservicee.saveAttendance(this.attendances).subscribe((res) =>{
      alert('Attendance Saved Successfully!');
      this.route.navigateByUrl('/attendance/report');
    });
  }
}

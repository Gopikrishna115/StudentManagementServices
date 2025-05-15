import { Component, OnInit } from '@angular/core';
import { Course, Student, StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent implements OnInit {
  attendanceData: any[] = [];
  studentId: number | undefined = undefined;
  courseId: number | undefined = undefined;
  attendanceDate: string | undefined = undefined;
  courses :Course[]=[];
  students:Student[]=[];
  constructor(private attendanceService: StudentService) {}

  ngOnInit(): void {
    this.loadAttendance();
     this.attendanceService.getCourses().subscribe(res=>this.courses=res);
     this.attendanceService.getStudents().subscribe(res=>this.students=res);
  }

  loadAttendance(): void {
    this.attendanceService.getAttendance(this.studentId, this.courseId, this.attendanceDate)
      .subscribe(data => {
        this.attendanceData = data;
      });
  }
  GetStudentName(studentID:number):string{
   return this.students.find(x=>x.studentID==studentID)?.name || "Student";
  }
  GetCourseName(courseID:number):string{
   return this.courses.find(x=>x.courseID==courseID)?.courseName ||"Course";
  }

  Clearfilter(){
    this.studentId =undefined;
    this.courseId =undefined;
    this.attendanceDate =undefined;
    this.loadAttendance();
  }
  filterAttendance(): void {
    this.loadAttendance();
  }
}

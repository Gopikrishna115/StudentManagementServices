import { Component, OnInit } from '@angular/core';
import { Course, StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  usertype:string|null= '';
  students: any[] = [];
   Courses:Course[] =[];
  constructor(private studentService: StudentService) {
    this.studentService.usertype.subscribe((response)=>{
      this.usertype=response
    });
  }

  ngOnInit() {
    this.loadStudents();
     this.studentService.getCourses().subscribe(res=> this.Courses = res);
  }

  loadStudents() {
    this.studentService.getStudents().subscribe((res) => {
      this.students = res;
    });
  }
  
 

  deleteStudent(studentID: number) {
    this.studentService.deleteStudent(studentID).subscribe((res) => {
      console.log('Student deleted successfully');
      this.loadStudents(); 
    });
  }

  getCourseName(courseId:any):string{
    return this.Courses.find(x=>x.courseID==courseId)?.courseName || "Nan";
    }
  

  assignCourse(student: any, event: any): void {
    const courseId = Number(event.target.value);
    if (courseId && !(student.courses || []).includes(courseId)) {
      if(!student.courses)student.courses = [];
      student.courses.push(courseId);
      this.studentService.updateStudent(student).subscribe(() => {
        this.loadStudents();
      });
    }
  }

  removeCourse(student: any, courseId: number): void {
    student.courses = student.courses.filter((id: number) => id !== courseId);
    this.studentService.updateStudent(student).subscribe(() => {
      this.loadStudents();
    });
  }
}

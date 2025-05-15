import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course, StudentService, Teacher } from 'src/app/services/student.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  usertype:string| null = localStorage.getItem('UserType');
  courses: Course[] = [];
  teachers: Teacher[] = [];
  constructor(private courseService: StudentService,private route:Router) {
    this.courseService.usertype.subscribe((response)=>{
      this.usertype=response
    });
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
    });
    this.loadTeachers();
  }

  loadTeachers() {
    this.courseService.getTeachers().subscribe((data) => {
      this.teachers = data;
    });
  }

  getTeacherName(teacherID: number): string {
    const teacher = this.teachers.find(t => t.teacherID === teacherID);
    return teacher ? teacher.name : 'Unknown';
  }

  addCourse(): void {
    this.route.navigate(['courses/form']);
  }

  editCourse(courseID: number): void {
    this.route.navigateByUrl('courses/form/'+courseID);
  }

  deleteCourse(courseID: number): void {
    if (confirm("Are you sure you want to delete this course?")) {
      this.courseService.deleteCourse(courseID).subscribe(() => {
        this.courses = this.courses.filter(c => c.courseID !== courseID);
      });
    }
  }
}

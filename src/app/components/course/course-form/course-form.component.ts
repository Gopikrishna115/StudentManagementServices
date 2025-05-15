import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, StudentService, Teacher } from 'src/app/services/student.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  teachers: Teacher[] = [];
  submitted = false;
  courseID: number | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private courseService: StudentService,
    private router: Router,
    private route:ActivatedRoute,

  ) {}
  ngOnInit() {
    this.initializeForm();
    this.loadTeachers();
      const id = this.route.snapshot.params['id'];
      if (id) {
        this.courseID = Number(id);
        this.isEditMode = true;
        this.loadCourseDetails(this.courseID);
      }
  
  }
  initializeForm() {
    this.courseForm = this.fb.group({
      courseName: ['', [Validators.required, Validators.minLength(3)]],
      teacherID: ['', Validators.required]
    });
  }
  loadTeachers() {
    this.courseService.getTeachers().subscribe((data) => {
      this.teachers = data;
    });
  }
  loadCourseDetails(courseID: number) {
    this.courseService.getCourseById(courseID).subscribe((course) => {
      if (course) {
        this.courseForm.patchValue({
          courseName: course.courseName,
          teacherID: course.teacherID
        });
      }
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.courseForm.valid) {
      const courseData: Course = {
        courseID: this.courseID || 0, 
        courseName: this.courseForm.value.courseName,
        createdAt: new Date(),
        teacherID: this.courseForm.value.teacherID
      };

      if (this.isEditMode) {
        this.courseService.updateCourse(courseData).subscribe(() => {
          alert('Course updated successfully!');
          this.router.navigateByUrl('/courses');
        });
      } else {
        this.courseService.addCourse(courseData).subscribe(() => {
          alert('Course added successfully!');
          this.courseForm.reset();
          this.submitted = false;
          this.router.navigateByUrl('/courses');
       
        });
      }
    }
  }
  
}

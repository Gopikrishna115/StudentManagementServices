import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { StudentService, Teacher } from 'src/app/services/student.service';


@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss']
})
export class TeacherFormComponent implements OnInit {
  teacherForm: FormGroup;
  teacherID?: number;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private teacherService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.teacherForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.teacherID = this.route.snapshot.params['id'];
    if (this.teacherID) {
      this.isEdit = true;
      this.teacherService.getTeacher(this.teacherID).subscribe((teacher) => {
        this.teacherForm.patchValue(teacher);
      });
    }
  }

  onSubmit(): void {
    if (this.teacherForm.valid) {
      const teacherData: Teacher = this.teacherForm.value;
      
      if (this.isEdit) {
        teacherData.teacherID = this.teacherID;
        this.teacherService.updateTeacher(teacherData).subscribe((res) => {
          this.router.navigate(['/teachers']);
        });
      } else {
        this.teacherService.addTeacher(teacherData).subscribe((res) => {
          this.router.navigate(['/teachers']);
        });
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  courseList: any[] = [];  

  constructor(private fb: FormBuilder, private studentService: StudentService,private route:Router) {}

  ngOnInit() {
    this.studentForm = this.fb.group({
      studentid: [0],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      courses: [[]],  
      createdat: ['', Validators.required],
    });

  }



  onSubmit() {
    if (this.studentForm.valid) {
      console.log("Form Submitted", this.studentForm.value);
      this.studentService.addStudent(this.studentForm.value).subscribe((res)=>{
      alert("Student Added Successfully");
      this.route.navigateByUrl('/students');
      });
    } else {
      console.log("Form is Invalid!");
    }
  }
}

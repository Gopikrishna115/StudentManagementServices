import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService ,private route:Router,private studentservice : StudentService) {
    this.loginForm = this.fb.group({
      id:[0],
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType:['']
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
       localStorage.setItem('login',JSON.stringify(response));
       localStorage.setItem('UserType',response.userType);
       this.studentservice.usertype.next(response.userType);
        this.route.navigateByUrl('/dashboard')


      },
      error: (error) => {
        alert('Invalid credentials!');
        this.errorMessage = 'Invalid credentials!';
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService, Teacher } from 'src/app/services/student.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {
  usertype:string | null = localStorage.getItem('UserType');
  teachers: Teacher[] = [];

  constructor(private teacherService: StudentService, public router: Router) {
    this.teacherService.usertype.subscribe((response)=>{
      this.usertype=response
    });
  }

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe((data) => {
      this.teachers = data;
    });
  }

  editTeacher(id: any) {
    this.router.navigate(['/teachers/form', id]); 
  }

  deleteTeacher(id: any) {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.teacherService.deleteTeacher(id).subscribe(() => {
        this.loadTeachers(); 
      });
    }
  }
}

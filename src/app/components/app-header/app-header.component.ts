import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  dropdownVisible = true;
  userType:string='';
  user:any;
    constructor(private route:Router,private studentService:StudentService){
        this.studentService.usertype.subscribe((res)=>{
          this.userType=res;
        const userstring = localStorage.getItem('login');
        if(userstring){
          this.user = JSON.parse(userstring);
        }
        });
        
    }
  showDropdown() {
    this.dropdownVisible = true;
  }


  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  logout() {
    console.log("User logged out");
    this.user={};
    this.userType='';
    localStorage.clear();
    this.studentService.usertype.next('');
    this.route.navigateByUrl("/login");
  }
}

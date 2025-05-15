import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent {
  
  isSidebarHidden = false;
  usertype:string='';
  constructor(private studentservice:StudentService){
    this.studentservice.usertype.subscribe(response=>this.usertype=response);
  }
  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
    
    
  }

}

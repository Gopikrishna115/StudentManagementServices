import { NgModule } from '@angular/core';
import { StudentListComponent } from './student-list.component';
import { CommonModule } from '@angular/common';
import { StudentFormModule } from "../student-form/student-form.module";



@NgModule({
  declarations: [
    StudentListComponent
  ],
  imports: [
    CommonModule,
    StudentFormModule
],
  exports:[StudentListComponent]
})
export class StudentListModule { }

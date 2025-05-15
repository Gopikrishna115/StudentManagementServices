import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseListComponent } from './course-list/course-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { courseroutingModule } from './course.routing';

@NgModule({
  declarations: [CourseFormComponent,CourseListComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    courseroutingModule
  ],
  exports:[CourseFormComponent,CourseListComponent]
})
export class CourseModule { }

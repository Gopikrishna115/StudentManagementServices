import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
    { path: '', component: TeacherListComponent },
    { path: 'form', component: TeacherFormComponent },
    { path: 'form/:id', component: TeacherFormComponent }
  ];
@NgModule({
  declarations: [
    TeacherFormComponent,
    TeacherListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forChild(routes)
],
  exports:[TeacherFormComponent,TeacherListComponent]
})
export class TeacherModule { }

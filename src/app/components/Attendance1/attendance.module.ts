import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
const routes: Routes = [
    { path: '', component: AttendanceComponent },
    { path: 'report', component: AttendanceReportComponent },
  ];
@NgModule({
  declarations: [AttendanceComponent,AttendanceReportComponent],
  imports: [
    CommonModule,
    RouterModule,RouterModule.forChild(routes),
    ReactiveFormsModule,FormsModule
  ],
  exports:[AttendanceComponent,AttendanceReportComponent]
})
export class AttendanceModule { }

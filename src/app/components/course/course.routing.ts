import { RouterModule, Routes } from "@angular/router";
import { CourseListComponent } from "./course-list/course-list.component";
import { CourseFormComponent } from "./course-form/course-form.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: '', component: CourseListComponent },
    { path: 'form', component: CourseFormComponent },
    { path: 'form/:id', component: CourseFormComponent }
  ];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class courseroutingModule{
    
}

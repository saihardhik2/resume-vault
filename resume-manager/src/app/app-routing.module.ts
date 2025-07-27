import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { StudentHomeComponent } from './student-home.component';
import { AdminHomeComponent } from './admin-home.component';
import { ResumeUploadComponent } from './resume-upload.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'student-home', component: StudentHomeComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'upload-resume', component: ResumeUploadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

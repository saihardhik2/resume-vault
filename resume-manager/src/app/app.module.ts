import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { StudentHomeComponent } from './student-home.component';
import { AdminHomeComponent } from './admin-home.component';
import { ResumeUploadComponent } from './resume-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentHomeComponent,
    AdminHomeComponent,
    ResumeUploadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

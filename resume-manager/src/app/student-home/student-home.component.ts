import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent {
  constructor(private router: Router) {}

  editResume() {
    this.router.navigate(['/upload-resume']);
  }
}

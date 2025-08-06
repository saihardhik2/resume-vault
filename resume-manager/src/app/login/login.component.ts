import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  role: string = 'student';

  constructor(private router: Router) {}

  login() {
    if (this.role === 'student') {
      this.router.navigate(['/student-home']);
    } else if (this.role === 'admin') {
      this.router.navigate(['/admin-home']);
    }
  }
}

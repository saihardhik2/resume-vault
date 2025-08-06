import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as sha256 from 'crypto-js/sha256';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username = '';
  password = '';
  role = 'student';

  constructor(private http: HttpClient) {}

  signup() {
    const hashedPassword = sha256(this.password).toString();

    this.http.post('http://localhost:3000/api/users/signup', {
      username: this.username,
      password: hashedPassword,
      role: this.role
    }).subscribe({
      next: (res: any) => {
        alert(res.message);
      },
      error: (err) => {
        alert(err.error.message || 'Signup failed');
      }
    });
  }
}

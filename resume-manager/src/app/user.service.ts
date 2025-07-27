import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  signup(data: any) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }
}

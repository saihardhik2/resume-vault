import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private baseUrl = 'http://localhost:3000/api/resumes';

  constructor(private http: HttpClient) {}

  uploadResume(formData: FormData) {
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getAllResumes() {
    return this.http.get(`${this.baseUrl}/resumes`);
  }
}

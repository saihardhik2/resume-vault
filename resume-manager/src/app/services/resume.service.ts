import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl = 'http://localhost:3000/api/resumes';

  constructor(private http: HttpClient) {}

  uploadResume(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  getAllResumes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }
}

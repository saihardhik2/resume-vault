import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  resumes: any[] = [];
  analysisResult: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/api/resumes/all')
      .subscribe(data => this.resumes = data);
  }

  analyzeResume(resumePath: string) {
    this.analysisResult = null; // Reset before showing new result
    this.http.post<any>('http://localhost:3000/api/resumes/analyze', { path: resumePath })
      .subscribe({
        next: (result) => {
          this.analysisResult = result;
        },
        error: (err) => {
          console.error('Analysis failed', err);
          alert('Failed to analyze resume');
        }
      });
  }
}

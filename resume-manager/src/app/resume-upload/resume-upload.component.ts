import { Component } from '@angular/core';
import { ResumeService } from './resume.service';

@Component({
  selector: 'app-resume-upload',
  templateUrl: './resume-upload.component.html',
  styleUrls: ['./resume-upload.component.css']
})
export class ResumeUploadComponent {
  name = '';
  roll = '';
  selectedFile!: File;

  constructor(private resumeService: ResumeService) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('roll', this.roll);
    formData.append('resume', this.selectedFile);

    this.resumeService.uploadResume(formData).subscribe({
      next: () => alert('Uploaded successfully!'),
      error: (err: any) => {
        console.error(err);
        alert('Upload failed');
      }
    });
  }
}

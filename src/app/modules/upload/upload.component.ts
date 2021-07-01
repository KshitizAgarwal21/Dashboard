import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  constructor(private authService:AuthServiceService) { }
  selectedFiles?: FileList;
  currentFile?: File;
  //file: File |null=null;
  ngOnInit(): void {
  }
  onChange(event:any) :void {
    this.selectedFiles = event.target.files;
}
  
  upload(){
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
    this.authService.uploadFile(this.currentFile).subscribe((event: any) => {
      console.log(event.message);
    },err=>{
      console.log(err.error.message)
    })
  }
    }
  }
}

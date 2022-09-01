import {Component, OnDestroy, OnInit} from '@angular/core';
import {UploadFileService} from "../upload-file.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit, OnDestroy {

  files: Set<File>;
  inscricao: Subscription;

  constructor(private uploadFileService: UploadFileService, private service: UploadFileService) { }

  ngOnInit(): void {
  }

  onChange(event) {
    console.log(event);
    const selectedFiles: FileList = <FileList>event.srcElement.files;
    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ');
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.inscricao = this.service.upload(this.files, 'http://localhost:8000/upload')
        .subscribe(response => console.log('Upload concluído'));
    }
  }

  ngOnDestroy(): void {
    if (this.inscricao) {
      this.inscricao.unsubscribe();
    }
  }
}

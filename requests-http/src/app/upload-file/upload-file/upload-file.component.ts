import {Component, OnDestroy, OnInit} from '@angular/core';
import {UploadFileService} from "../upload-file.service";
import {Subscription} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {filterResponse, uploadProgress} from "../../shared/rxjs-operators";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit, OnDestroy {

  files: Set<File>;
  inscricao: Subscription;
  progress = 0;

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

    this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.inscricao = this.service.upload(this.files, `${environment.BASE_URL}/upload`)
        .pipe(
          uploadProgress(progress => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponse()
        ).subscribe(response => console.log('Upload concluído'));
        // .subscribe((event: HttpEvent<Object>) => {
        //   // console.log(event);
        //   if (event.type === HttpEventType.Response) {
        //     console.log('Upload concluído');
        //   } else if (event.type === HttpEventType.UploadProgress) {
        //     const percentDone = Math.round((event.loaded * 100) / event.total);
        //     // console.log('Progresso', percentDone);
        //     this.progress = percentDone;
        //   }
        // });
    }
  }

  ngOnDestroy(): void {
    if (this.inscricao) {
      this.inscricao.unsubscribe();
    }
  }

  onDownloadExcel() {
    this.service.download(`${environment.BASE_URL}/downloadExcel`)
      .subscribe((res:any) => {
        this.service.handleFile(res, 'report.xls');
      });
  }

  onDownloadPDF() {
    this.service.download(`${environment.BASE_URL}/downloadPDF`)
      .subscribe((res:any) => {
        this.service.handleFile(res, 'report.pdf');
      });
  }
}

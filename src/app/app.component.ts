import { Component, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { ConfigService } from './config/config.service';
import { FileService } from './file/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  // List of images
  items: any[] = [];

  // Webcam
  showWebcam = true;
  videoOptions: MediaTrackConstraints = {};
  webcamImage: WebcamImage = new WebcamImage('', '', new ImageData(1, 1));
  private trigger: Subject<void> = new Subject<void>();
  
  constructor(private configService: ConfigService, private fileService: FileService) {}

  ngOnInit(): void {
    this.configService.setApiUrl(this.configService.getConfig().apiUrl);
    this.refresh();
  }

  refresh(): void {
    this.fileService.list()
      .subscribe(response => {
        this.items = response;
      });
  }

  toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage.imageAsBase64);
    this.webcamImage = webcamImage;
    const arr = this.webcamImage.imageAsDataUrl.split(",");
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const file: File = new File([u8arr], '', { type: 'image/jpeg' })
    const formData = new FormData();  
    formData.append('file', file);
    this.fileService.upload(formData)
      .subscribe(() => {
        this.refresh();
      });
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  upload(event: any) {
    console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();  
      formData.append('file', event.target.files[0]);
      this.fileService.upload(formData)
        .subscribe(() => {
          this.refresh();
        });
    }
  }
  
  delete(id: any): void {
    this.fileService.delete(id)
      .subscribe(() => {
        this.refresh();
      });
  }

}

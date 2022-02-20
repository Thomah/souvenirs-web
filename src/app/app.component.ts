import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config/config.service';
import { FileService } from './file/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  items: any[];

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

  upload(event) {
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
  
  delete(id): void {
    this.fileService.delete(id)
      .subscribe(() => {
        this.refresh();
      });
  }

}

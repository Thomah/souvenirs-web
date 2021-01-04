import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from './config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  href: string = '';
  apiUrl: string = '';

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.href = location.origin;
    console.log(this.configService.getConfig());
    this.apiUrl = this.configService.getConfig()[this.href].apiUrl;
  }
}

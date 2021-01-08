import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ConfigService {
  private appConfig: any;
  private apiUrl: string = '';

  constructor(private _http: HttpClient) {}

  loadConfig() {
    return this._http
      .get('https://api.jsonbin.io/b/5ff372a714be54706019a60d/2')
      .toPromise()
      .then((res) => {
        this.appConfig = res;
      });
  }

  getApiUrl(): string {
    return this.apiUrl;
  }

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  getConfig() {
    return this.appConfig;
  }
}

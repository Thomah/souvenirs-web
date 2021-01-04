import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ConfigService {
  private appConfig: any;

  constructor(private _http: HttpClient) {}

  loadConfig() {
    return this._http
      .get('https://api.jsonbin.io/b/5ff372a714be54706019a60d/2')
      .toPromise()
      .then((res) => {
        this.appConfig = res;
      });
  }

  getConfig() {
    return this.appConfig;
  }
}

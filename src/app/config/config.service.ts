import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private appConfig: any;
  private apiUrl: string = '';

  constructor(private _http: HttpClient) {}

  loadConfig() {
    return this._http
      .get('./assets/config.json')
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

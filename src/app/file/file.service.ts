import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient, private configService: ConfigService) {}

  list() {
    return this.http.get<File[]>(`${this.configService.getApiUrl()}/files`);
  }

  upload(formData: FormData) {
    return this.http.post<void>(
      `${this.configService.getApiUrl()}/files`,
      formData
    );
  }

  delete(id: string) {
    return this.http.delete<void>(
      `${this.configService.getApiUrl()}/files/${id}`
    );
  }
}

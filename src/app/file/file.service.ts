import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

    constructor(private http: HttpClient, private configService: ConfigService) { }
  
    list(offset = 0, limit = 10) {
      const params = new HttpParams()
        .set('offset', offset.toString())
        .set('limit', limit.toString());
      return this.http.get<File[]>(`${this.configService.getApiUrl()}/files`, { params });
    }

    upload(formData: FormData) {
      return this.http.post<void>(`${this.configService.getApiUrl()}/files`, formData);  
    }

    delete(id: string) {
      return this.http.delete<void>(`${this.configService.getApiUrl()}/files/${id}`);  
    }
}

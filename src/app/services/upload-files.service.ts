import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('files', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/uploadMultipleFiles`, formData, {
      reportProgress: true
    });

    console.log(req);
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}

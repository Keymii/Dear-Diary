import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpClientService {

  constructor(private http: HttpClient) { }

  post(url: string, body: any, options?: any) {
    const headers = new HttpHeaders(options?.headers || {});
    headers.delete('Origin');
    options = { ...options, withCredentials: true, headers };
    return this.http.post(url, body, options);
  }
}
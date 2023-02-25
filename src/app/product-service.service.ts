import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(private http: HttpClient) {}
  createnote(data: { title: any; mainNoteContent: any; id?: string }) {
    console.log(data);
    const headers = new HttpHeaders({ myHeader: 'myNote' });
    this.http
      .post<{ name: string }>(
        'https://testserver-768e5-default-rtdb.firebaseio.com/data.json',
        data
      )
      .subscribe((ref) => {
        console.log(ref);
      });
  }

  deletenote() {}
}

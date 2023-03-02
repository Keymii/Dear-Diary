import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { config } from '../../config';
import { CustomHttpClientService } from '../../httpClient.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent {

  // loginData: {name:string,userid:string, pswd:string,id?:string}
  constructor(private http: CustomHttpClientService) {}

  newLoginData(loginData: { name: string; userid: string; pswd: string,id?:string }) {
    // const headers = new HttpHeaders({ myHeader: 'loginData' });
    this.http
      .post(config.url + 'register/?format=json', loginData)
      .subscribe((ref) => {});
    console.log(loginData.pswd);
  }
}

import { style } from '@angular/animations';
import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { config } from '../../config';
import { CustomHttpClientService } from '../../httpClient.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent {
  OnInit(){document.getElementById('disappear').style.visibility="visible"}
  
  loginData: {name:string,userid:string, pswd:string,session_key:string}
  constructor(private http: CustomHttpClientService) {}
 

  newLoginData(loginData: { name: string; userid: string; pswd: string,session_key:string }) {
    // const headers = new HttpHeaders({ myHeader: 'loginData' });
    const specialKey = uuidv4();
    const requestData = {
      session_key: specialKey
    };
    this.http
      .post(config.url + 'register/?format=json', loginData)
      .subscribe((ref) => {});
    console.log(loginData);
  }
  disappear() {
    document.getElementById('disappear').style.visibility="hidden"
  }
}

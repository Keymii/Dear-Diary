import { style } from '@angular/animations';
import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { config } from '../../config';
import { CustomHttpClientService } from '../../httpClient.service';
import { v4 as uuidv4 } from 'uuid';
import{BalloonsComponent} from '../balloons/balloons.component'

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
    document.getElementById('disappear').style.visibility="hidden"
    document.getElementById('progressbar').style.width = '100vw';
          const checkbox = document.getElementById("finish") as HTMLInputElement;
          if (checkbox) {
             checkbox.checked = true;
          }
          // document.getElementById('user-name').textContent = this.data.userid;
          document.getElementById('welcomemessage').textContent = "Welcome Aboard "+ loginData.name + "!";
          document.getElementById('someone').style.visibility = 'initial';
          document.getElementById('appballoons').style.visibility = 'initial';
  }
  // disappear() {
  //   document.getElementById('disappear').style.visibility="hidden"
  // }
}

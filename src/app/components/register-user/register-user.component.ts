import { userData } from './../login-page/login-page.component';
import { Router } from '@angular/router';
import { style } from '@angular/animations';
import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { config } from '../../config';
import { CustomHttpClientService } from '../../httpClient.service';
import { v4 as uuidv4 } from 'uuid';
import{BalloonsComponent} from '../balloons/balloons.component'

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit{
  OnInit() { document.getElementById('disappear').style.visibility = "visible" }
  loginData: {name:string,userid:string, pswd:string,session_key:string}
  constructor(private http: CustomHttpClientService,private router:Router) {}
  ngOnInit(): void {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let requestParam: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(userData),
      redirect: 'follow',
    };
    fetch(
      'http://127.0.0.1:8000/checkLogin/?session_key=' +
      localStorage.getItem('session_key'),
      requestParam
      )
      .then((response) => 
      response.text())
      .then((result) => {
        console.log(result);
        if (result ==="True") {
          this.router.navigate(['note']);
        }
      })
      .catch((error) => console.log('error', error));
  }
 

  newLoginData(loginData: { name: string; userid: string; pswd: string,session_key:string }) {
    const headers = new HttpHeaders({ myHeader: 'loginData' });
    this.http
      .post(config.url + 'register/?format=json', loginData)
      .subscribe((ref) => {
        console.log("user exists")
        document.getElementById('disappear').style.visibility="hidden"
        document.getElementById('progressbar').style.width = '100vw';
              const checkbox = document.getElementById("finish") as HTMLInputElement;
              if (checkbox) {
                 checkbox.checked = true;
              }
              // document.getElementById('user-name').textContent = this.data.userid;
              document.getElementById('welcomemessage').textContent = "Welcome Aboard "+ this.loginData.name + "!";
              document.getElementById('someone').style.visibility = 'initial';
              document.getElementById('appballoons').style.visibility = 'initial';
      });
      // setTimeout(() => {
        
        // this.router.navigate(['login'])
      // }, 50);

  }
  // disappear() {
   
  // }
  // disappear() {
  //   document.getElementById('disappear').style.visibility="hidden"
  // }
}

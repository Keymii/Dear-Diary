import { userData } from './../login-page/login-page.component';
import { Router } from '@angular/router';
import { style } from '@angular/animations';
import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { config } from '../../config';
import { CustomHttpClientService } from '../../httpClient.service';
import { v4 as uuidv4 } from 'uuid';
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
      });
      setTimeout(() => {
        this.router.navigate(['login'])
      }, 50);

  }
  disappear() {
    document.getElementById('disappear').style.visibility="hidden"
  }
}

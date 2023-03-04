import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  constructor(private http: HttpClient, private router: Router) {}
  stringuserid: string;
  data: { userid: string; pswd: string; session_key?: string } = {
    userid: '',
    pswd: '',
    session_key: '',
  };

  
  login() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let requestParam: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(this.data),
      redirect: 'follow',
    };
    
    fetch('http://127.0.0.1:8000/login/', requestParam)
    .then((response) => response.text())
    .then((result) => {
      localStorage.setItem('session_key', result);
    })
    .catch((error) => {
    });
    requestParam = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'http://127.0.0.1:8000/checkLogin/?session_key=' +
        localStorage.getItem('session_key'),
      requestParam
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        if (result === 'True') {
          this.router.navigate(['note']);
        } else {
        }
      })
      .catch((error) => console.log('error', error));
  }
  disappear() {
    document.getElementById('disappear').style.visibility = 'hidden';
  }
}
export let stringuserid;
export let userData;

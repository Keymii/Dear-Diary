import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { config } from '../../config';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  // data type fixed

  userData: { userid: string; pswd: string; session_key?: string } = {
    userid: '',
    pswd: '',
    session_key: '',
  };

  //initialiser

  ngOnInit() {
    this.sharesession_key();
  }

  //sends login data to server to verify user

  login() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let requestParam: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(this.userData),
      redirect: 'follow',
    };
    localStorage.setItem('userid', this.userData.userid);
    fetch(config.url + 'login/', requestParam)
      .then((response) => response.text())
      .then((result) => {
        localStorage.setItem('session_key', result);
      })
      .catch((error) => {
        console.log(error);
      });
    requestParam = {
      method: 'GET',
      redirect: 'follow',
    };

   setTimeout(() => {
     fetch(
       config.url +
         'checkLogin/?session_key=' +
         localStorage.getItem('session_key'),
       requestParam
     )
       .then((response) => response.text())
       .then((result) => {
           if (result === 'True') {
             this.router.navigate(['note']);
             console.log('login successful');
           } else {
             this.router.navigate(['login']);
             console.log('Cannot find user, create new user');
           }
         })
       .catch(() => console.error(''));
   }, 50);
  }

  //disappearing login button
  disappear() {
    document.getElementById('disappear').style.visibility = 'hidden';
  }

  // shares session_key with registeruser page for auto login

  sharesession_key() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let requestParam: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(this.userData),
      redirect: 'follow',
    };
    fetch(
      config.url +
        'checkLogin/?session_key=' +
        localStorage.getItem('session_key'),
      requestParam
    )
      .then((response) => response.text())
      .then((result) => {
        if (result === 'True') {
          this.router.navigate(['note']);
          console.log('Session exist, auto login');
        } else {
          console.log(
            'You do not have any active login session, try login again or create new user'
          );
        }
      })
      .catch((error) => {
        console.log('error', error);
        console.error('error connecting servers');
      });
  }
}
export let userData;

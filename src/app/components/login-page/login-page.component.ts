import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import{BalloonsComponent} from '../balloons/balloons.component';


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
    fetch('http://127.0.0.1:8000/'+ 'login/', requestParam)
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
    // localStorage.setItem('userid',this.userData.userid)
    setTimeout(() => {
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
           document.getElementById('disappear').style.visibility = 'hidden';
          document.getElementById('progressbar').style.width = '100vw';
          const checkbox = document.getElementById("finish") as HTMLInputElement;
          if (checkbox) {
             checkbox.checked = true;
          }
          // document.getElementById('user-name').textContent = this.data.userid;
          document.getElementById('welcomemessage').textContent = "Welcome back "+ this.userData.userid + "!";
          document.getElementById('someone').style.visibility = 'initial';
          document.getElementById('errormess').style.visibility = 'hidden';
          document.getElementById('appballoons').style.visibility = 'initial';
          // function redirect() {
          //   this.router.navigate(['note']);
          // }
          // setTimeout(redirect, 3000);
         } else {
          document.getElementById('errormess').style.visibility = 'initial';
         } })
       
        }, 50);
      }
      // .catch((error) => document.getElementById('errormess').style.visibility = 'initial');
    
    
    
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
      'http://127.0.0.1:8000/' +
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
          // document.getElementById('errormess').style.visibility = 'initial';
        }
      })
      // .catch((error) => document.getElementById('errormess').style.visibility = 'initial');
      // console.log('error', error));
  }
  // disappear() {
  //   document.getElementById('disappear').style.visibility = 'hidden';
  // }
}
export let userData;
export let string_key=localStorage.getItem('session_key')
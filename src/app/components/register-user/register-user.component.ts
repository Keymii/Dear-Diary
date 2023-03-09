import { userData } from './../login-page/login-page.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {  HttpHeaders } from '@angular/common/http';
import { config } from '../../config';
import { CustomHttpClientService } from '../../httpClient.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit{ 

  constructor(private http: CustomHttpClientService, private router: Router) { }
  

//initialiser

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
      config.url+'checkLogin/?session_key=' +
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
      .catch(() => console.log('You do not have any active login session, try login again or create new user'));
  }
 



  // sending req to server for registering new user

  newLoginData(loginData: { name: string; userid: string; pswd: string,session_key:string }) {
    const headers = new HttpHeaders({ myHeader: 'loginData' });
    this.http
      .post(config.url + 'register/?format=json', loginData)
      .subscribe()
    
      setTimeout(() => {
        this.router.navigate(['login'])
      }, 50);

  }



  // when register button is clicked the button disappears logic

  disappear() {
    document.getElementById('disappear').style.visibility = "hidden";
  }
}

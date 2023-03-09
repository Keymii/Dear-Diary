import { userData } from './../login-page/login-page.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { config } from '../../config';
import { CustomHttpClientService } from '../../httpClient.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  constructor(private http: CustomHttpClientService, private router: Router) {}

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
      config.url +
        'checkLogin/?session_key=' +
        localStorage.getItem('session_key'),
      requestParam
    )
      .then((response) => response.text())
      .then((result) => {
        if (result === 'True') {
          this.router.navigate(['note']);
          console.log("Session exist, auto login")

        } else {
          console.log(
            'You do not have any active login session, try login again or create new user'
          );
        }
      })
      .catch(() => {
        console.error('error connecting servers');
      });
  }

  // sending req to server for registering new user

  newLoginData(loginData: { name: string; userid: string; pswd: string }) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let requestParam: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(loginData),
      redirect: 'follow',
    };
    fetch(config.url + 'register/?format=json', requestParam)
      .then((response) => response.text())
      .then((result) => {
        if (result === 'True') {
          this.router.navigate(['login']);
          console.log("Registration successful")
        } else {
          this.router.navigate(['register']);
          console.log("user already exist")
        }
      })
      .catch(() => console.error('error connecting servers'));
    
    

    setTimeout(() => {
      this.router.navigate(['login']);
    }, 50);
  }

  // when register button is clicked the button disappears logic

  disappear() {
    document.getElementById('disappear').style.visibility = 'hidden';
  }
}

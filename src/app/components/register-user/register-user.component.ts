import { userData } from './../login-page/login-page.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { config } from '../../config';
import { CustomHttpClientService } from '../../httpClient.service';
import { v4 as uuidv4 } from 'uuid';
import{BalloonsComponent} from '../balloons/balloons.component'

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
              document.getElementById('welcome').style.visibility = 'initial';
              
        } else {
          console.log("user already exist")
          document.getElementById('errormess').style.visibility = 'initial';
        }
      })
      .catch(() => console.error('error connecting servers'));
    
    

    setTimeout(() => {
      this.router.navigate(['login']);
    }, 100000);
  }

  // when register button is clicked the button disappears logic

  disappear() {
    document.getElementById('disappear').style.visibility = 'hidden';
  }
  team(){
    document.getElementById('appballoons').style.visibility = 'initial';
    document.getElementById('errormes').style.visibility = 'initial';
    document.getElementById('approots').style.visibility = 'hidden';
  }
  close(){
    document.getElementById('approots').style.visibility = 'initial';
    document.getElementById('appballoons').style.visibility = 'hidden';
    document.getElementById('errormes').style.visibility = 'hidden';

  }
}

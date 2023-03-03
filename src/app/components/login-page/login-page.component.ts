import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../../config';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
    loginData: { userid: string; pswd: string; session_key?: string } = {
    userid: '',
      pswd: '',
    session_key:''
  };

  constructor(public http: HttpClient, public router: Router) {}

   specialKey = uuidv4();
   requestData = {
    session_key: this.specialKey,
    userid: this.loginData.userid,
    pswd: this.loginData.pswd,
  };
  postLoginData(requestData) {
console.log(requestData)
    this.http.post<{ success: boolean }>(config.url + 'login/', requestData).subscribe((response) => {
      // if (response.success) {
      //   this.router.navigate(['/note']);
      // } else {
      //   console.log('Login failed:', response);
      // }
    });
     fetch(config.url + 'login/')
    .then((response) => response.json())
    .then((resolve) => {
      console.log(resolve);
      if (resolve === 'true') {
        this.router.navigate(['/note']);
        stringuserid = this.loginData.userid;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  // stringuserid: string;
  // loginData: { userid: string; pswd: string; session_key: string };
  // constructor(public http: HttpClient, public router: Router) {}
  // postLoginData(loginData: {
  //   userid: string;
  //   pswd: string;
  // }) {
  //   const specialKey = uuidv4();
  //   const requestData = {
  //     session_key: specialKey,
  //     userid: this.loginData.userid,
  //     pswd: this.loginData.pswd,
  //   };

  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Access-Control-Allow-Origin': '*',
  //       Authorization: 'authkey',
  //       userid: '1',
  //     }),
  //   };
  //   this.http
  //     .post<{ success: boolean }>(config.url + 'login/', requestData)
  //     .subscribe((response) => {
  //       if (response.success) {
  //         this.router.navigate(['/note']);
  //       } else {
  //         console.log('Login failed:', response);
  //       }
  //     });
  //   this.http
  //     .post<{ name: string }>(config.url + 'login/?format=json', loginData)
  //     .subscribe((ref) => {});
  //   console.log(loginData);
    
    
    
  //   fetch(config.url + 'login/', {})
  //   .then((response) => response.json())
  //   .then((resolve) => {
  //     console.log(resolve);
  //     if (resolve === 'true') {
  //       this.router.navigate(['/note']);
  //       this.stringuserid = this.loginData.userid;
  //       console.log(stringuserid);
  //     }
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
  // }

  // public fetchLoginData() {
  //   this.http
  //     .get<{
  //       [key: string]: { userid: string; pswd: string; session_key?: string };
  //     }>(config.url + '')
  //     .pipe(
  //       map((ref) => {
  //         const data = [];
  //         for (const key in ref) {
  //           if (ref.hasOwnProperty(key)) {
  //             data.push({ ...ref[key], id: key });
  //           }
  //         }
  //         return data;
  //       })
  //     )
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }
  // a: Promise<any> = fetch(config.url + 'login/', {})
  //   .then((response) => response.json())
  //   .then((resolve) => {
  //     console.log(resolve);
  //     if (resolve === 'true') {
  //       this.router.navigate(['/note']);
  //       this.stringuserid = this.loginData.userid;
  //       console.log(stringuserid);
  //     }
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
}
export let stringuserid;
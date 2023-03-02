import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../../config';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})


export class LoginPageComponent {
  loginData: {username : any, fpass:any,id?: string }
  constructor(public http: HttpClient,public router : Router) {} 
  postLoginData(loginData: {username : any, fpass:any,id?: string }) {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'Authorization':'authkey',
        'userid':'1'
      })
    };

    this.http
      .post<{ name: string }>(
        config.url+'login/?format=json',
        loginData
      )
      .subscribe((ref) => { });
    console.log(loginData)
  }
    
    public fetchLoginData() {
      this.http
        .get<{
          [key: string]: { username : any, fpass:any,id?: string  };
        }>(config.url+'login/?format=json')
        .pipe(
          map((ref) => {
            const data = [];
            for (const key in ref) {
              if (ref.hasOwnProperty(key)) {
                data.push({ ...ref[key], id: key });
              }
            }
            return data;
          })
        )
        .subscribe((data) => {
          // if () {}
          // else{}
          console.log(data)
    });
    }
    a: Promise<any> = fetch(
      config.url + 'login/?format=json'
    )
      .then(
        (resolve) => resolve.json()
        //returns a promise
      )
      .then((resolve) => {
        console.log(resolve);
        if (resolve === true) {
        this.router.navigate(["/section"])
        }
        else{}
        
      })
 
    
}



import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../../config';

const trigger = document.getElementById("c-form__toggleIcon");
const elementToHide = document.getElementById("linke");

trigger.addEventListener("click", () => {
  elementToHide.style.visibility = "hidden";
}); 

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})


export class LoginPageComponent {

  loginData: {userinput : any, passwordInput:any,id?: string }
  constructor(public http: HttpClient) { } 
  postLoginData(loginData: {userinput : any, passwordInput:any,id?: string }) {
    // const headers = new HttpHeaders({ myHeader: 'Angular' });
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'Authorization':'authkey',
        'userid':'1'
      })
    };

    this.http
      .post<{ name: string }>(
        'https://testserver-768e5-default-rtdb.firebaseio.com/data.json',
        loginData
      )
      .subscribe((ref) => { });
  }
    
    public fetchLoginData() {
      this.http
        .get<{
          [key: string]: { userinput : any, passwordInput:any,id?: string  };
        }>(config.url+'registere/?format=json')
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

  toDisplay = true;
  
  toggleData() {
    this.toDisplay = !this.toDisplay;
  }
    
}



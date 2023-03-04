import { QueryParamsHandling, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs/operators';
import { userData } from '../login-page/login-page.component';
import { config } from '../../config';
// import{userData} from '../login-page/login-page.component'
@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
})
export class TextAreaComponent implements OnInit {
  //type defined
  currentTextId: string;
  editMode: boolean = false;
  allData: { Page: any; Data: any }[] = [];
  currentTitle: string;
  @ViewChild('textForm') form: {
    setValue(arg0: { Page: any; Data: any }): unknown;
    Page?: any;
    Data: any;
  };
  stringuserid:string = localStorage.getItem('userid')
  session_key:string =   localStorage.getItem('sessionkey')
  ngOnInit() { 
    document.getElementById('deleteNote').style.visibility = 'hidden';
    document.getElementById("error").style.visibility = "hidden"
    // this.userloginornot()
 this.fetchData()

  }
  userloginornot() {
    if (
      this.stringuserid === userData.session_key) { this.fetchData(); }
    else {
      document.getElementById("error").style.visibility="visible"
    }
  }

  constructor(public http: HttpClient, public router: Router) {}

  // when one of the note is clicked in notes pannel

  onNoteClicked(Page: string) {
    this.editMode = true;
    let selectedNote = this.allData.find((p) => {
      return p.Page === Page;
    });
    this.currentTextId = Page;
    this.form.setValue({
      Page: selectedNote.Page,
      Data: selectedNote.Data,
    });
    document.getElementById('deleteNote').style.visibility = 'visible';
  }

  // add button logic

  newNote(data: { Page: any; Data: any }) {
    this.form.setValue({
      Page: '',
      Data: '',
    });
    this.editMode = false;
    document.getElementById('deleteNote').style.visibility = 'hidden';
  }

  // save button logic

  editorSaveData(data: { Page: any; Data: any }) {
    this.currentTitle=data.Page
    if (!this.editMode) {
      this.saveMainContentData(data);
    } else {
      this.updateData(this.currentTextId, data);
    }
  }

  saveMainContentData(data: { Page: any; Data: any }) {
    //     let requestOptions:RequestInit = {
    //     method: 'POST',
    //     redirect: 'follow',
    //     body: JSON.stringify(data)
    // };      
    this.http.post<{ data: { Page: any; Data: any }, }>(config.url + 'home/'+this.stringuserid+'/'+this.currentTitle).subscribe((ref) => {
      console.log(ref);
    });
      // fetch( config +
      //   'home/' +this.stringuserid
      //   +'/'+
      //   this.currentTitle +
      //   '/createpagedata/', requestOptions)
      //   .then(response => response.text())
      //   .then(result => console.log(result))
      //   .catch(error => console.log('error', error));
      //   // this.newNote(data);
  
  }
  updateData(Page: string, value: { Page: any; Data: any }) {
    let requestOptions:RequestInit = {
      method: 'POST',
      redirect: 'follow'
    };
    
    fetch("http://127.0.0.1:8000/renamePage/?userid=user1&page=Old Page&new_page=New Page", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    // setTimeout(this.fetchData,2)
  }

  //data fetching from servers

  private fetchData() {
    let requestOptions:RequestInit = {
      method: 'GET',
      redirect: 'follow'
   };
    
    fetch( config +
      'home/' +
    this.stringuserid +
      '/' , requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        this.allData = result
      })
      .catch(error => console.log('error', error));
    // this.http
    //   .get<{
    //     [key: string]: { Page: any; Data: any };
    //   }>(config.url + 'home/'+stringuserid+'/'+this.currentTextId)
    //   .pipe(
    //     map((ref) => {
    //       const data = [];
    //       for (const key in ref) {
    //         if (ref.hasOwnProperty(key)) {
    //           data.push({ ...ref[key], Page: key });
    //         }
    //       }
    //       return data;
    //     })
    //   )
    //   .subscribe((data) => {
    //     console.log(data);
    //     this.allData = data;
    //   });
    // console.log(stringuserid)
  }

  //delete data logic

  deleteNote(Page: string) {
    let requestOptions:RequestInit = {
      method: 'DELETE',
      redirect: 'follow'
    };
    
    fetch('http://127.0.0.1:8000/deletePage/?userid=' + userData.userid + '&page=New Page', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    // setTimeout(this.fetchData, 2);
  }
  deleteThisNote(currentTextId: string) {
    let requestOptions:RequestInit = {
      method: 'DELETE',
      redirect: 'follow'
    };
    
    fetch('http://127.0.0.1:8000/deletePage/?userid='+userData.userid+'&page=New Page', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    //  setTimeout(this.fetchData(), 2)
  }
  logout() {
    localStorage.removeItem('session_key')
    localStorage.removeItem('userid')
    let requestOptions:RequestInit = {
      method: 'POST',
      redirect: 'follow'
    };
    
    fetch(config+"logout/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    
    
    this.router.navigate(['/login']);
  }
}

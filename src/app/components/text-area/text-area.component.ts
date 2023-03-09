

import { QueryParamsHandling, Router } from '@angular/router';
import {
  Component,
  OnInit,
  ViewChild,
  ɵclearResolutionOfComponentResourcesQueue,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../../config';
import{ userData} from '../login-page/login-page.component'


@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
})



export class TextAreaComponent implements OnInit {
  
  //type defined
currentTitleId:string
 currentTextId: string;
  editMode: boolean = false;
  allData: { page: any; data: any }[] = [];
  titleData: { userid: any; page:any}[]=[]
  currentTitle: string;
  // current
  noteData: any
  @ViewChild('textForm') form: {
    setValue(arg0: { page: any; data: any }): unknown;
    page?: any;
    data: any;
  };
  stringuserid: string = localStorage.getItem('userid');
  session_key: string = localStorage.getItem('sessionkey');
  ngOnInit() {
    document.getElementById('deleteNote').style.visibility = 'hidden';
    document.getElementById('error').style.visibility = 'hidden';
    this.userloginornot()
    this.fetchData();
    // console.log(this.stringuserid)
    document.getElementById('useridpanel').textContent = localStorage.getItem('userid');
  }
  userloginornot() {
    if (this.stringuserid === userData.session_key) {
      this.fetchData();
    } else {
      document.getElementById('errormes').style.visibility = 'visible';
    }
  }

  constructor(public http: HttpClient, public router: Router) {}

  // when one of the note is clicked in notes pannel

  onNoteClicked(page: string) {
    this.editMode = true;
    let selectedNote = this.noteData.find((p) => {
      return p.page == page;
    });
    this.currentTextId = page;
    this.form.setValue({
      page: selectedNote.page,
      data: selectedNote.data,
    });
    document.getElementById('deleteNote').style.visibility = 'visible';
    console.log(this.currentTextId)
  }

  // add button logic

  newNote(Data: { page: any; data: any }) {
    this.form.setValue({
      page: '',
      data: '',
    });
    this.editMode = false;
    document.getElementById('deleteNote').style.visibility = 'hidden';
  }

  // save button logic
  // userid:string
  editorSaveData(Data: { page: any; data: any }) {
    // this.userid=this.stringuserid
    this.currentTitle = Data.page;
    if (!this.editMode) {
      this.saveMainContentData(Data);
    } else {
      this.updateData(Data);
    }
  }

  saveMainContentData(Data: { page: any; data: any }) {

    this.http
      .post(
        config.url +
          'home/' +
          this.stringuserid +
          '/' +
          this.currentTitle +
          '/createpagedata/',
        Data
      )
      .subscribe((ref) => {});
   
    setTimeout(() => {
      this.fetchData()
    }, 50);
  }
  updateData( Data: { page: any; data: any }) {
    console.log(this.currentTextId)
    
      this.http.put(config.url+'home/'+this.stringuserid+'/'+this.currentTextId+'/updatepagedata/',Data).subscribe((ref)=>{})
      setTimeout(() => {
        this.fetchData()
      }, 10);
  }

  //data fetching from servers
  private fetchData() {
   

    this.http
      .get(config.url + 'pagewithdata/' + this.stringuserid + '/')
    
      .subscribe((data) => {
        this.noteData = data;
        console.log(data);
      });
  }
  //delete data logic

  deleteNote(page: string) {
     this.noteData.find((p) => {
      return p.page == page;
    });
    this.currentTitleId = page;

    
    
var requestOptions:RequestInit = {
  method: 'DELETE',
  redirect: 'follow'
};

fetch(config.url+'deletePage/'+this.stringuserid+'/'+this.currentTitleId, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  }
  deleteThisNote(page: string) {

      this.noteData.find((p) => {
       return p.page == page;
     });
     this.currentTitleId = page;
 
     var requestOptions:RequestInit = {
      method: 'DELETE',
      redirect: 'follow'
    };
    
    fetch(config.url+'deletePage/'+this.stringuserid+'/'+this.currentTitleId, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
      setTimeout(() => {
        this.fetchData()
      }, 10);
  }

  
  
  logout() {
    localStorage.removeItem('session_key');
    localStorage.removeItem('userid');
    let requestOptions: RequestInit = {
      method: 'POST',
      redirect: 'follow',
    };

    fetch(config + 'logout/', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

    this.router.navigate(['/login']);
  }
}


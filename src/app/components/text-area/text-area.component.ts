import { QueryParamsHandling, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { config } from '../../config';
@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
})
export class TextAreaComponent implements OnInit {



  //type defined
  currentTitleId: string;
  currentTextId: string;
  editMode: boolean = false;
  currentTitle: string;
  noteData: any;
  stringuserid: string = localStorage.getItem('userid');
  session_key: string = localStorage.getItem('sessionkey');



  // current

  @ViewChild('textForm') form: {
    setValue(arg0: { page: any; data: any }): unknown;
    page?: any;
    data: any;
  };

  // initialiser

  ngOnInit() {
    document.getElementById('deleteNote').style.visibility = 'hidden';
    document.getElementById('error').style.visibility = 'hidden';
    // this.userloginornot()
    this.fetchData();
  }
  // userloginornot() {
  //   if (this.stringuserid === userData.session_key) {
  //     this.fetchData();
  //   } else {
  //     document.getElementById('error').style.visibility = 'visible';
  //   }
  // }



  constructor(public http: HttpClient, public router: Router) {}

  // when one of the note is clicked in notes pannel

  onNoteClicked(page: string) {
    this.editMode = true;
    let selectedNote = this.noteData.find((p) => {
      return p.page == page;
    });
    this.currentTextId = page;
    this.form.setValue({           //sets value in note title and data
      page: selectedNote.page,
      data: selectedNote.data,
    });
    document.getElementById('deleteNote').style.visibility = 'visible';
    console.log(this.currentTextId);
  }

  // addnew note button logic

  newNote(Data: { page: any; data: any }) {
    this.form.setValue({
      page: '',
      data: '',
    });
    this.editMode = false;
    document.getElementById('deleteNote').style.visibility = 'hidden';
  }


//  when editbutton is clicked one if the two function below runs based on the condition in editorSaveData

  editorSaveData(Data: { page: any; data: any }) {
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
      this.fetchData();
    }, 50);
  }
  updateData(Data: { page: any; data: any }) {
    console.log(this.currentTextId);

    this.http
      .put(
        config.url +
          'home/' +
          this.stringuserid +
          '/' +
          this.currentTextId +
          '/updatepagedata/',
        Data
      )
      .subscribe((ref) => {});
    setTimeout(() => {
      this.fetchData();
    }, 50);
  }



// to get data from servers

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

    var requestOptions: RequestInit = {
      method: 'DELETE',
      redirect: 'follow',
    };

    fetch(
      config.url +
        'deletePage/' +
        this.stringuserid +
        '/' +
        this.currentTitleId,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

    setTimeout(() => {
      this.fetchData();
    }, 50);
  }
  deleteThisNote(page: string) {
    this.noteData.find((p) => {
      return p.page == page;
    });
    this.currentTitleId = page;

    var requestOptions: RequestInit = {
      method: 'DELETE',
      redirect: 'follow',
    };

    fetch(
      config.url +
        'deletePage/' +
        this.stringuserid +
        '/' +
        this.currentTitleId,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
    setTimeout(() => {
      this.fetchData();
    }, 10);
    setTimeout(() => {
      this.fetchData();
    }, 50);
  }



  // logout button logic
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

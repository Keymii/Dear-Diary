// import { QueryParamsHandling, Router } from '@angular/router';
// import { Component, OnInit, ViewChild } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { config } from '../../config';
// import { stringuserid } from '../login-page/login-page.component'
// import{ userData } from '../login-page/login-page.component'
// @Component({
//   selector: 'app-text-area',
//   templateUrl: './text-area.component.html',
//   styleUrls: ['./text-area.component.css'],
// })
// export class TextAreaComponent implements OnInit {
//   //type defined
//   currentTextId: string;
//   editMode: boolean = false;
//   allData: { title: any; mainNoteContent: any }[] = [];

//   @ViewChild('textForm') form: {
//     setValue(arg0: { title: any; mainNoteContent: any }): unknown;
//     title?: any;
//     mainNoteContent: any;
//   };

//   ngOnInit() { 
//     document.getElementById('deleteNote').style.visibility = 'hidden';
//     document.getElementById("error").style.visibility = "hidden"
//     this.userloginornot()
//     console.log(localStorage.getItem('sessionkey'))
//   }
//   userloginornot() {
//     if (
//       localStorage.getItem('sessionkey') === userData.session_key) { this.fetchData(); }
//     else {
//       document.getElementById("error").style.visibility="visible"
//     }
//   }

//   constructor(public http: HttpClient, public router: Router) {}

//   // when one of the note is clicked in notes pannel

//   onNoteClicked(title: string) {
//     this.editMode = true;
//     let selectedNote = this.allData.find((p) => {
//       return p.title === title;
//     });
//     this.currentTextId = title;
//     this.form.setValue({
//       title: selectedNote.title,
//       mainNoteContent: selectedNote.mainNoteContent,
//     });
//     document.getElementById('deleteNote').style.visibility = 'visible';
//   }

//   // add button logic

//   newNote(data: { title: any; mainNoteContent: any }) {
//     this.form.setValue({
//       title: '',
//       mainNoteContent: '',
//     });
//     this.editMode = false;
//     document.getElementById('deleteNote').style.visibility = 'hidden';
//   }

//   // save button logic

//   editorSaveData(data: { title: any; mainNoteContent: any }) {
//     if (!this.editMode) {
//       this.saveMainContentData(data);
//     } else {
//       this.updateData(this.currentTextId, data);
//     }
//   }

//   saveMainContentData(data: { title: any; mainNoteContent: any }) {
//     // const headers = new HttpHeaders({ myHeader: 'Angular' });
//     this.http
//       .post<{ name: string }>(
//         'http://127.0.0.1:8000/' +
//           'home/' +
//           'abc@abc.com' +
//           // stringuserid +
//           '/' +
//           // this.currentTextId +
//           'diary' +
//           '/createpagedata/',
//         data
//       )
//       .subscribe((ref) => {});
//     this.newNote(data);
//     // setTimeout(this.fetchData, 2);
//   }
//   updateData(title: string, value: { title: any; mainNoteContent: any }) {
//     let requestOptions:RequestInit = {
//       method: 'POST',
//       redirect: 'follow'
//     };
    
//     fetch("http://127.0.0.1:8000/renamePage/?userid=user1&page=Old Page&new_page=New Page", requestOptions)
//       .then(response => response.text())
//       .then(result => console.log(result))
//       .catch(error => console.log('error', error));
//     // setTimeout(this.fetchData,2)
//   }

//   //data fetching from servers

//   private fetchData() {
//     this.http
//       .get<{
//         [key: string]: { title: any; mainNoteContent: any };
//       }>(config.url + 'home/'+stringuserid+'/'+this.currentTextId)
//       .pipe(
//         map((ref) => {
//           const data = [];
//           for (const key in ref) {
//             if (ref.hasOwnProperty(key)) {
//               data.push({ ...ref[key], title: key });
//             }
//           }
//           return data;
//         })
//       )
//       .subscribe((data) => {
//         console.log(data);
//         this.allData = data;
//       });
//     console.log(stringuserid)
//   }

//   //delete data logic

//   deleteNote(title: string) {
//     let requestOptions:RequestInit = {
//       method: 'DELETE',
//       redirect: 'follow'
//     };
    
//     fetch('http://127.0.0.1:8000/deletePage/?userid=' + userData.userid + '&page=New Page', requestOptions)
//       .then(response => response.text())
//       .then(result => console.log(result))
//       .catch(error => console.log('error', error));
//     // setTimeout(this.fetchData, 2);
//   }
//   deleteThisNote(currentTextId: string) {
//     let requestOptions:RequestInit = {
//       method: 'DELETE',
//       redirect: 'follow'
//     };
    
//     fetch('http://127.0.0.1:8000/deletePage/?userid='+userData.userid+'&page=New Page', requestOptions)
//       .then(response => response.text())
//       .then(result => console.log(result))
//       .catch(error => console.log('error', error));
//     //  setTimeout(this.fetchData(), 2)
//   }
//   logout() {
//     // localStorage.removeItem()
//     this.http
//       // .post<{ name: string }>(config.url , )
//       // .subscribe((ref) => { });
//     this.router.navigate(['/login']);
//   }
// }

import { QueryParamsHandling, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../../config';
import{stringuserid, userData} from '../login-page/login-page.component'


@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
})



export class TextAreaComponent implements OnInit {
  
  //type defined
  currentTextId: string;
  editMode: boolean = false;
  allData: { title: any; mainNoteContent: any }[] = [];

  @ViewChild('textForm') form: {
    setValue(arg0: { title: any; mainNoteContent: any }): unknown;
    title?: any;
    mainNoteContent: any;
  };

  ngOnInit() { 
    document.getElementById('deleteNote').style.visibility = 'hidden';
    document.getElementById("error").style.visibility = "hidden"
    this.userloginornot()
    console.log(localStorage.getItem('sessionkey'))
    console.log(userData.userid)
    this.fetchData()

  }
  userloginornot() {
    if (
      localStorage.getItem('sessionkey') === userData.session_key) { this.fetchData(); }
    else {
      document.getElementById("error").style.visibility="visible"
    }
  }

  constructor(public http: HttpClient, public router: Router) {}

  // when one of the note is clicked in notes pannel

  onNoteClicked(title: string) {
    this.editMode = true;
    let selectedNote = this.allData.find((p) => {
      return p.title === title;
    });
    this.currentTextId = title;
    this.form.setValue({
      title: selectedNote.title,
      mainNoteContent: selectedNote.mainNoteContent,
    });
    document.getElementById('deleteNote').style.visibility = 'visible';
  }

  // add button logic

  newNote(data: { title: any; mainNoteContent: any }) {
    this.form.setValue({
      title: '',
      mainNoteContent: '',
    });
    this.editMode = false;
    document.getElementById('deleteNote').style.visibility = 'hidden';
  }

  // save button logic

  editorSaveData(data: { title: any; mainNoteContent: any }) {
    if (!this.editMode) {
      this.saveMainContentData(data);
    } else {
      this.updateData(this.currentTextId, data);
    }
  }

  saveMainContentData(data: { title: any; mainNoteContent: any }) {
    // const headers = new HttpHeaders({ myHeader: 'Angular' });
    // this.http
    //   .post<{ name: string }>(
    //     config +
    //       'home/' +
    //       stringuserid +
    //       '/' +
    //       this.currentTextId +
    //       '/createpagedata/',
    //     data
    //   )
    //   .subscribe((ref) => { });
      let requestOptions:RequestInit = {
        method: 'POST',
        redirect: 'follow',
        body: JSON.stringify(data.title)
      };
      
      fetch( 'http://127.0.0.1:8000/' +
        'home/' +
        'test2@gmail.com'+'/'+
        'ask' +
        '/createpagedata/', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        this.newNote(data);
    // setTimeout(this.fetchData, 2);
  }
  updateData(title: string, value: { title: any; mainNoteContent: any }) {
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
      userData.userid +
      '/' , requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        this.allData = result
      })
      .catch(error => console.log('error', error));
    // this.http
    //   .get<{
    //     [key: string]: { title: any; mainNoteContent: any };
    //   }>(config.url + 'home/'+stringuserid+'/'+this.currentTextId)
    //   .pipe(
    //     map((ref) => {
    //       const data = [];
    //       for (const key in ref) {
    //         if (ref.hasOwnProperty(key)) {
    //           data.push({ ...ref[key], title: key });
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

  deleteNote(title: string) {
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


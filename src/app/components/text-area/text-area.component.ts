import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../../config';

// import { FormsModule } from '@angular/forms';
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
    title: any;
    mainNoteContent: any;
  };
  ngOnInit() {
    this.fetchData();
    document.getElementById('deleteNote').style.visibility = 'hidden';
  }

  constructor(public http: HttpClient,public router:Router) { }

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
    this.http
      .post<{ name: string }>(
      'https://testserver-768e5-default-rtdb.firebaseio.com/data.json',
        data
      )
      .subscribe((ref) => {});
      this.newNote(data);
      // setTimeout(this.fetchData, 2);
  }
  updateData(
    id: string,
    value: { title: any; mainNoteContent: any  }
  ) {
    this.http
      .put(
        config.url+'home/user1/Page 1/updatepagedata/'+
        
          '.json',
        value
      )
      .subscribe();
      // setTimeout(this.fetchData,2)
  }

  //data fetching from servers

  private fetchData() {
    this.http
      .get<{
        [key: string]: { title: any; mainNoteContent: any; id?: string };
      }>(   config.url+'home/user1/Page 1/')
      .pipe(
        map((ref) => {
          const data = [];
          for (const key in ref) {
            if (ref.hasOwnProperty(key)) {
              data.push({ ...ref[key], title: key });
            }
          }
          return data;
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.allData = data;
      });
  }

  //delete data logic

  deleteNote(title: string) {
    this.http
      .delete(
        'https://testserver-768e5-default-rtdb.firebaseio.com/data/' +
          title +
          '.json'
      )
      .subscribe();
    setTimeout(this.fetchData,2)
  }
  deleteThisNote(currentTextId: string) {
    this.http
      .delete(
        'https://testserver-768e5-default-rtdb.firebaseio.com/data/' +
          this.currentTextId +
          '.json'
      )
      .subscribe();
    //  setTimeout(this.fetchData(), 2)
  } 
  logout() {
    // localStorage.removeItem()
    this.router.navigate(['/login'])
    
  }
}


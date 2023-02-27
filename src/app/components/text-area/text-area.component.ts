import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../../config'
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
  allData: { title: any; mainNoteContent: any; id?: string }[] = [];

  @ViewChild('textForm') form: {
    setValue(arg0: { title: any; mainNoteContent: any }): unknown;
    title: any;
    mainNoteContent: any;
  };
  ngOnInit() {
    this.fetchData();
    document.getElementById('deleteNote').style.visibility = 'hidden';
  }

  constructor(public http: HttpClient) {}

  // when one of the note is clicked in notes pannel

  onNoteClicked(id: string) {
    this.editMode = true;
    let selectedNote = this.allData.find((p) => {
      return p.id === id;
    });
    this.currentTextId = id;
    this.form.setValue({
      title: selectedNote.title,
      mainNoteContent: selectedNote.mainNoteContent,
    });
    document.getElementById('deleteNote').style.visibility = 'visible';
  }

  // add button logic

  newNote(data: { title: any; mainNoteContent: any; id?: string }) {
    this.form.setValue({
      title: '',
      mainNoteContent: '',
    });
    this.editMode = false;
    document.getElementById('deleteNote').style.visibility = 'hidden';
  }

  // save button logic

  editorSaveData(data: { title: any; mainNoteContent: any; id?: string }) {
    if (!this.editMode) {
      this.saveMainContentData(data);
    } else {
      this.updateData(this.currentTextId, data);
    }
  }

  saveMainContentData(data: { title: any; mainNoteContent: any; id?: string }) {
    const headers = new HttpHeaders({ myHeader: 'Angular' });
    this.http
      .post<{ name: string }>(
        'https://testserver-768e5-default-rtdb.firebaseio.com/data.json',
        data
      )
      .subscribe((ref) => {
      });
    this.fetchData();
    this.newNote(data);
  }
  updateData(
    id: string,
    value: { title: any; mainNoteContent: any; id?: string }
  ) {
    this.http
      .put(
        'https://testserver-768e5-default-rtdb.firebaseio.com/data/' +
          id +
          '.json',
        value
      )
      .subscribe();
    this.fetchData();
  }

  //data fetching from servers

  private fetchData() {
    this.http
      .get<{
        [key: string]: { title: any; mainNoteContent: any; id?: string };
      }>('https://testserver-768e5-default-rtdb.firebaseio.com/data.json')
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
        console.log(data);
        this.allData = data;
      });
  }

  //delete data logic

  deleteNote(id: string) {
    this.http
      .delete(
        'https://testserver-768e5-default-rtdb.firebaseio.com/data/' +
          id +
          '.json'
      )
      .subscribe();
      this.fetchData();
  }
  deleteThisNote(currentTextId: string) {
    this.http
      .delete(
        'https://testserver-768e5-default-rtdb.firebaseio.com/data/' +
          this.currentTextId +
          '.json'
      )
      .subscribe();
      this.fetchData();
  }
}

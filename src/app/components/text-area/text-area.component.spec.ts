import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaComponent } from './text-area.component';

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextAreaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function changeBackground() {
  fetch('https://pixabay.com/api/?key=34015109-5a54c83734c023f14c4d3d264&category=nature&orientation=horizontal&per_page=100')
    .then(response => response.json())
    .then(data => {
      var images = data.hits.map(hit => hit.webformatURL);
      var index = Math.floor(Math.random() * images.length);
      document.getElementById("myDiv").style.backgroundImage = "url('" + images[index] + "')";
    })
    .catch(error => console.error(error));
}

changeBackground(); // Call the function once to set the initial background image
setInterval(changeBackground, 6000); // Call the changeBackground function every 1 minute (60000 milliseconds)
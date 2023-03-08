import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { BalloonsComponent } from './components/balloons/balloons.component';




@NgModule({
  declarations: [AppComponent, TextAreaComponent, LoginPageComponent, RegisterUserComponent, BalloonsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule, 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}


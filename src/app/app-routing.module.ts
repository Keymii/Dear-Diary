import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
const routes: Routes = [
  { path: 'note', component:TextAreaComponent  },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

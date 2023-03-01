import { RegisterUserComponent } from './components/register-user/register-user.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
const routes: Routes = [
  { path: 'register', component: RegisterUserComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'note', component: TextAreaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

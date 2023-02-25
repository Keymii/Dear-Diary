import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextAreaComponent } from './components/text-area/text-area.component';
const routes: Routes = [{path:'',component:AppComponent},
  { path: 'note', component:TextAreaComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyContactsComponent } from './myContacts/myContacts.component';
const routes: Routes = [
  {path:'',component:MyContactsComponent},
  {path:'MyContactsComponent',component:MyContactsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

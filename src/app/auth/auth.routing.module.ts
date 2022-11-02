import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const authRouter: Routes = [
  {path: 'login', component: LoginComponent},

]


@NgModule({
  declarations: [
    LoginComponent,
  ],
  exports: [
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authRouter),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthRoutingModule {
}

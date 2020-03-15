import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login'} },
  { path: 'signup', component: SignupComponent, data: {title: 'Sign Up'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
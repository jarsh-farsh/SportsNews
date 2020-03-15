import { NgModule } from "@angular/core";
import { LoginComponent } from './login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations:[
        LoginComponent,
        SignupComponent
    ],
    imports:[
        AuthRoutingModule,
        SharedModule
    ],
    exports:[]
})

export class AuthModule { }
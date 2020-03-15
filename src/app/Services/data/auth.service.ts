import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/Models/User';
import { tap, map } from 'rxjs/operators';
import { UserService } from './user.service';
import { GlobalMessageService } from '../layout/global-message.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    currentUser: User = null;

    private userUrl = 'http://localhost:4000/api/users/login';

    constructor(private http: HttpClient,
                private userService: UserService,
                private gmService: GlobalMessageService,
                private router: Router){ 

        let user = JSON.parse(localStorage.getItem('currentUser'));
        this.currentUser = user;

    }

    login(email: string, password:string){

        var user = {
            user: {
                email: email,
                password: password
            }
        }

        return this.http.post(this.userUrl, user).pipe(
            tap(
                data => {
                    if(!data['error']){
                        this.setUserSession(data['data']);
                        this.currentUser = data['data'];
                    }
                }
            ),
            res => {
                return res;
            }
        )
    }

    logout(){
        this.clearUserSession();
        this.currentUser = null;
        this.gmService.addMessage("Successfully logged out", "info");
        this.router.navigate(['/']);
    }

    setUserSession(user){
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    clearUserSession(){
        localStorage.removeItem('currentUser');
    }
}
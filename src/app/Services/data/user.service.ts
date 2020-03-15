import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../Models/User';
import { tap, map } from 'rxjs/operators';
import { Utilities } from 'src/app/utils/utils';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    userUrl = "http://localhost:4000/api/users";

    constructor(private http: HttpClient){ }

    getAllUsers(): Observable<User[]> {
        
        return this.http.get<User[]>(this.userUrl).pipe(
            tap(
                data => {

                },
                error => {
                    Utilities.handleHttpError(error);
                }
            ),
            map(data => data['data'])
        )

    }

    getUserById(id): Observable<User>{

        return this.http.get<User>(this.userUrl + `/${id}`).pipe(
            tap(
                data => {

                },
                error => {
                    Utilities.handleHttpError(error);
                }
            ),
            map(data => data['data'])
        )
    }
}
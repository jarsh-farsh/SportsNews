import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vote } from 'src/app/Models/Article';
import { Utilities } from 'src/app/utils/utils';
import { tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {

    private feedbackUrl = 'http://localhost:4000/api/feedbacks'
    private votesUrl = 'http://localhost:4000/api/votes'

    constructor(private http: HttpClient){ }

    getVotesByUserId(id): Observable<Vote[]>{
        return this.http.get<any[]>(this.votesUrl + `/${id}`)
            .pipe(
                tap(
                    data => {
                        if(data['error']){
                            
                        }
                    },
                    error => {
                        Utilities.handleHttpError(error);
                    }
                ),
                map(data => data['data'])
            )
    }

}
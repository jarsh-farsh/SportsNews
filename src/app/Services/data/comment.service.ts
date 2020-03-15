import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, delay } from 'rxjs/operators';
import { Utilities } from 'src/app/utils/utils';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    commentUrl = "http://localhost:4000/api/comments";

    constructor(private http: HttpClient){ }

    getCommentsForObject(
        getUser: boolean = true,
        getFeedback: boolean = true,
        getComments: boolean = true,
        article: string,
        comment: string,
        startIndex: number = 0,
        getCount: number = 15){

            var params = new HttpParams()
            .set("getUser", getUser.toString())
            .set("getFeedback", getFeedback.toString())
            .set("getComments", getComments.toString())
            .set("article", article ? article.toString() : article)
            .set("comment", comment ? comment.toString() : comment)
            .set("startIndex", startIndex.toString())
            .set("getCount", getCount.toString());

            return this.http.get<any[]>(this.commentUrl, { params: params })
                .pipe(
                    delay(1000),
                    tap(
                        data => {
                            if(data['error']){

                            }
                        },
                        error => Utilities.handleHttpError(error)
                    ),
                    map(data => data['data'])
                )
    }
}
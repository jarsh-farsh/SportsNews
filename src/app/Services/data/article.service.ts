import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Article } from '../../Models/Article';
import { tap, map, delay } from 'rxjs/operators';
import { Utilities } from 'src/app/utils/utils';


@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    private articleUrl = 'http://www.localhost:4000/api/articles';

    constructor(private http: HttpClient){ }

    getAllArticles(
        getImages: boolean = true, 
        getUser: boolean = true, 
        getFeedback: boolean = true, 
        getComments: boolean = true,
        startIndex: number = 0,
        getCount: number = 15): Observable<Article[]>{

        var params = new HttpParams()
            .set("getImages", getImages.toString())
            .set("getUser", getUser.toString())
            .set("getFeedback", getFeedback.toString())
            .set("getComments", getComments.toString())
            .set("startIndex", startIndex.toString())
            .set("getCount", getCount.toString());

        return this.http.get<any[]>(this.articleUrl, { params: params })
            .pipe(
                tap(
                    data => {
                        if(data['error']){

                        }
                    },
                    error => Utilities.handleHttpError(error)
                ),
                map(res => res['data'])
            )
        
    }

    getArticleById(
        id: string,
        getImages: boolean = true, 
        getUser: boolean = true, 
        getFeedback: boolean = true, 
        getComments: boolean = true): Observable<Article>{

        var params = new HttpParams()
            .set("getImages", getImages.toString())
            .set("getUser", getUser.toString())
            .set("getFeedback", getFeedback.toString())
            .set("getComments", getComments.toString());

        return this.http.get<any>(this.articleUrl+ `/${id}`, { params: params })
            .pipe(
                delay(1000),
                tap(
                    data => {
                        if(data['error']){

                        }
                    },
                    error => Utilities.handleHttpError(error)
                ),
                map(res => res['data'])
            )
        
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private apiKey: string = 'AIzaSyCDNLzA0TTvoKRQjYYS4ZRZfEwDnNOMm-Q';
  private uploadsKey: string = 'UUF1ymF8A4d2iovDeOXLE6iA';
  private channelId: string = 'UCF1ymF8A4d2iovDeOXLE6iA';
  private baseUrl: string = 'https://www.googleapis.com/youtube/v3/';
  watchUrl = 'https://www.youtube.com/embed/';


  constructor(private http: HttpClient) { }

  getVideoByVideoId(videoId): Observable<Object>{
    let url = this.baseUrl + 'playlistItems?playlistId=' + this.uploadsKey + '&key=' + this.apiKey + '&part=snippet' + '&videoId=' + videoId + '&pageToken=' + ''

    return this.http.get(url).pipe(
      map((res) => {
        return res;
      })
    )
  }

  getVideoWithNextToken(nextToken, maxResults = 15): Observable<Object>{
    let url = this.baseUrl + 'playlistItems?playlistId=' + this.uploadsKey + '&key=' + this.apiKey + '&part=snippet' + '&maxResults=' + maxResults + '&pageToken=' + nextToken;
    
    return this.http.get(url).pipe(
      map((res) => {
        return res;
      })
    )
  }

}

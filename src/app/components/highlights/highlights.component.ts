import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/Services/youtube.service';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.css']
})
export class HighlightsComponent implements OnInit {

  videos: any[];
  videoSelected: any;
  loadingVideos:boolean;
  private nextToken: string;
  private totalResults: number;
  private obtainedAllVideos: boolean;
  private videoSelectedByUser: boolean;

  constructor(private youtubeService: YoutubeService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.videos = [];
    this.videoSelected = "";
    this.nextToken = '';
    this.totalResults = 0;

    this.activatedRoute.queryParams
        .subscribe(params => {
          if(params['v']){
            this.youtubeService.getVideoByVideoId(params['v'])
                .subscribe(res => { this.videoSelected = res['items'][0] });
          }
        })

    this.getMoreVideos();
  }

  getMoreVideos(): void{

    if(this.obtainedAllVideos) return;

    this.loadingVideos = true;
    this.youtubeService.getVideoWithNextToken(this.nextToken).subscribe(
      res => {
        this.nextToken = res["nextPageToken"];
        this.totalResults = res["pageInfo"]["totalResults"];
        for(let vid of res["items"]){
          this.videos.push(vid);

          if(this.videoSelected === ""){
            this.videoSelected = vid;
          }

        }
        this.loadingVideos = false;

        if(this.videos.length == this.totalResults) this.obtainedAllVideos = true;
      }
    )
  }

  getVideoUrl(video: any): string{
    var autoplay = this.videoSelectedByUser ? '?rel=0&autoplay=1' : '';
    return this.youtubeService.watchUrl + video.snippet.resourceId.videoId + autoplay;
  }

  isVideoSelected(video: any): boolean{
    if(this.videoSelected.snippet.resourceId.videoId === video.snippet.resourceId.videoId) return true;

    return false;
  }

  selectVideo(video: any): void{
    if(this.isVideoSelected(video)) return;

    this.videoSelected = video;
    this.videoSelectedByUser = true;
    this.scrollToSelectedVideo();

  }

  scrollToSelectedVideo(): void{
    let el = document.getElementById('selectedVideo');
    el.scrollIntoView({behavior:"smooth"})
  }

}

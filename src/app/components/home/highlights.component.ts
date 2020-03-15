import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/Services/youtube.service';

@Component({
  selector: 'home-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.css']
})
export class HighlightsComponent implements OnInit {

  videos: any[];
  private loadingVideos: boolean;

  constructor(private youtubeService: YoutubeService) { }

  ngOnInit() {
    this.videos = [];
    this.getRecentVideos();
  }

  getRecentVideos(): void{
    this.loadingVideos = true;
    this.youtubeService.getVideoWithNextToken('', 3).subscribe({
      next: res => {
        this.videos = res['items'];
      }
    })
  }


}

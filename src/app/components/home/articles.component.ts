import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/Models/Article';
import { ArticleService } from 'src/app/Services/data/article.service';

@Component({
  selector: 'home-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class HomeArticlesComponent implements OnInit {

  articles: Article[]

  constructor(private articleService: ArticleService) { }

  ngOnInit() {

    this.articleService.getAllArticles(true, true, false, false, 0, 5).subscribe({
      next: res => {
        this.articles = res;
      },
      error: err => {
        console.log(err);
      }
    })

  }

}

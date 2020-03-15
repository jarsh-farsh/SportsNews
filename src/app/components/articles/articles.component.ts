import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/Services/data/article.service';
import { Article } from 'src/app/Models/Article';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Article[];

  constructor(private articleService: ArticleService) { }

  ngOnInit() {

    this.articleService.getAllArticles(true, true, false, false, 0, 15).subscribe({
      next: res => {
        this.articles = res;
      },
      error: err => console.log(err)
    })

  }

}

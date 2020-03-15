import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService } from 'src/app/Services/title.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article, Feedback, Vote } from 'src/app/Models/Article';
import { ArticleService } from 'src/app/Services/data/article.service';
import { CommentService } from 'src/app/Services/data/comment.service';
import { AuthService } from 'src/app/Services/data/auth.service';
import { FeedbackService } from 'src/app/Services/data/feedback.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {

  private sub: Subscription;

  article: Article;
  loadingArticle: boolean;
  loadingComments: boolean;
  loadingMoreComments: boolean = false;

  userVotes: Vote[];

  feedbackBarWidth: number;

  get isLoggedIn() {
    return this.authService.currentUser !== null;
  }

  get currentUser() {
    return this.authService.currentUser;
  }

  constructor(private titleService: TitleService,
              private authService: AuthService,
              private articleService: ArticleService,
              private commentService: CommentService,
              private feedbackService: FeedbackService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.sub = this.activatedRoute.params.subscribe(params => {
      //This is where we get the article data from the db
      //For now we will just change the title with the param

      this.getArticle(params['id']);
    })

  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  getArticle(id){
    this.loadingArticle = true;

    this.articleService.getArticleById(id, true, true, true, true).subscribe({
      next: res => {
        this.article = res;
        this.titleService.pageTitle = this.article.title;
      },
      error: err => {
        console.log(err);
      },
      complete: () => {
        this.loadingArticle = false;

        this.getComments();

        if(this.currentUser){
          this.getUserVotes();
        }
      }
    })
  }

  getComments(){
    this.loadingComments = true;

    this.commentService.getCommentsForObject(true, true, true, this.article.id, null, 0, 15).subscribe({
      next: res => {
        this.article.comments = res;
        this.updateFeedbackBar();
      },
      error: err => console.log(err),
      complete: () => {
        this.loadingComments = false
      }
    });
  }

  getUserVotes(){
    this.feedbackService.getVotesByUserId(this.currentUser.id).subscribe({
      next: res => {
        this.userVotes = res;
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  addFeedback(feedback: Feedback, choice: string): void{
    console.log(this.userVotes);
    var userVoted = this.userVotes.find(v => v.feedbackId === feedback.id);

    if(choice === "up") {
      //If user has already disliked the post, then subtract a dislike before updating likes
      if(userVoted && userVoted.vote === 'down') {
        userVoted.vote = 'up';
        feedback.dislikes--;
        feedback.likes++;
      }
      else if(userVoted && userVoted.vote === 'up'){
        this.userVotes = this.userVotes.filter(v => v.feedbackId !== userVoted.feedbackId);
        feedback.likes--;
      }
      else{
        userVoted = new Vote();
        userVoted.userId = this.currentUser.id;
        userVoted.feedbackId = feedback.id;
        userVoted.vote = 'up';
        this.userVotes.push(userVoted);
        feedback.likes++;
      }
    }
    else if(choice === "down"){
      //If user has already liked the post, then subtract a dislike before updating dislikes
      if(userVoted && userVoted.vote === 'up') {
        userVoted.vote = 'down';
        feedback.likes--;
        feedback.dislikes++;
      }
      else if(userVoted && userVoted.vote === 'down'){
        this.userVotes = this.userVotes.filter(v => v.feedbackId !== userVoted.feedbackId);
        feedback.dislikes--;
      }
      else{
        userVoted = new Vote();
        userVoted.userId = this.currentUser.id;
        userVoted.feedbackId = feedback.id;
        userVoted.vote = 'down';
        this.userVotes.push(userVoted);
        feedback.dislikes++;
      }
    }

    this.updateFeedbackBar();
  }

  submitComment(): void{
    
  }

  updateFeedbackBar(): void{
    var total = this.article.feedback.likes + this.article.feedback.dislikes;
    var percentage = total === 0 ? 0 : this.article.feedback.likes/total;

    this.feedbackBarWidth = 170 * percentage;
  }

  hasUserVoted(feedback: Feedback, vote: string): boolean{

    if(!this.userVotes) return;

    var feedbackFound = this.userVotes.find(v => v.feedbackId === feedback.id);

    if(feedbackFound){
      return feedbackFound.vote === vote;
    }

    return false;

  }
}

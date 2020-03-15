import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from 'src/app/Models/Comment';
import { CommentService } from 'src/app/Services/data/comment.service';
import { GlobalMessageService } from 'src/app/Services/layout/global-message.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slideXAndDisappear, slideXAndAppear } from '../shared/animations.component';
import { AuthService } from 'src/app/Services/data/auth.service';
import { Vote } from 'src/app/Models/Article';
import { analyzeFileForInjectables } from '@angular/compiler';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  animations: [
    trigger('commentAppear', [
      transition(':enter', [
        useAnimation(slideXAndAppear, {
          params: { from: '-40px', timing: '200ms ease-in-out'}
        })
      ]),
      transition(':leave', [
        useAnimation(slideXAndDisappear, {
          params: { to: '-40px', timing: '200ms ease-in-out'}
        })
      ])
    ])
  ]
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  @Input() mainComment: Comment;
  @Input() votes: Vote[];
  @Output() feedbackChange: EventEmitter<Object> = new EventEmitter<Object>();

  replying: boolean = false;

  showComments: boolean = false;
  loadingReplies: boolean = false;

  get isLoggedIn(){
    return this.authService.currentUser !== null;
  }

  get currentUser(){
    return this.authService.currentUser;
  }

  constructor(private commentService: CommentService,
              private authService: AuthService,
              private gmService: GlobalMessageService) { }

  ngOnInit() {

  }

  hasUserVoted(feedback, vote){ 
    var v = this.votes.find(v => v.feedbackId === feedback.id)

    if(v){
      return v.vote === vote;
    }

    return false;
  }

  addFeedback(feedback, vote){
    this.feedbackChange.emit({feedback, vote});
  }

  getReplies(){

    if(!this.comment.comments){

      this.loadingReplies = true;
      this.commentService.getCommentsForObject(true, true, true, null, this.comment.id, 0, 15)
        .subscribe({
          next: res => {
            this.comment.comments = res;
            this.showComments = true;
            this.loadingReplies = false;
          },
          error: err => console.log(err)
      })

    }
    else{
      this.showComments = !this.showComments;
    }

  }

  reply(){
    this.replying = !this.replying;
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/Models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utilities } from 'src/app/utils/utils';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slideXAndAppear, slideXAndDisappear } from '../shared/animations.component';

@Component({
  selector: 'app-comment-input',
  templateUrl: './comment-input.component.html',
  styleUrls: ['./comment-input.component.css'],
  animations: [
    trigger('commentInputAppear', [
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
export class CommentInputComponent implements OnInit {

  @Input() user: User;
  @Input() isReply: boolean;
  @Output() cancelReply = new EventEmitter();

  commentForm: FormGroup;

  commentFocus: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.commentForm = this.fb.group({
      comment: ['', [Validators.required]]
    })
  }

  submitComment(){

  }

  clearCommentBody(){
    this.commentForm.setValue({comment: ''});
  }

  isWhiteSpace(str){
    return Utilities.isNullOrWhiteSpace(str);
  }
}

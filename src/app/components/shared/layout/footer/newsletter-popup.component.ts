import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { trigger, transition, useAnimation, AnimationEvent } from '@angular/animations';
import { windowOpen, windowClose } from '../../animations.component';
import { Subscription, fromEvent } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utilities } from 'src/app/utils/utils';
import { GlobalMessageService } from 'src/app/Services/layout/global-message.service';

@Component({
  selector: 'app-newsletter-popup',
  templateUrl: './newsletter-popup.component.html',
  styleUrls: ['./newsletter-popup.component.css'],
  animations:[
    trigger('openCloseWindow', [
      transition(':enter', [
        useAnimation(windowOpen)
      ]),
      transition(':leave', [
        useAnimation(windowClose)
      ])
    ])
  ]
})
export class NewsletterPopupComponent implements OnInit {

  isOpen: boolean = false;
  @Output() onClose = new EventEmitter()

  emailDuplicate:boolean = false;
  emailFocus:boolean = false;

  newsletterForm: FormGroup;

  constructor(private fb: FormBuilder,
              private gmService: GlobalMessageService) { }

  ngOnInit() {
    this.isOpen = true;

    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(Utilities.getEmailPattern())]]
    })
  }

  windowClosed(event: AnimationEvent): void{
    if(event.toState === 'void'){
      this.onClose.emit(false);
    }
  }

  close(): void{
    this.isOpen = false;
  }

  submitEmail(){
    this.gmService.addMessage("You have been added to our newsletter!", "info");
    this.close();
  }

}

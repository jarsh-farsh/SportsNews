import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { transition, useAnimation, trigger, AnimationEvent } from '@angular/animations';
import { windowOpen, windowClose } from '../animations.component';
import { EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GlobalMessageService } from 'src/app/Services/layout/global-message.service';
import { Utilities } from 'src/app/utils/utils';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
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
export class ContactComponent implements OnInit, OnDestroy {

  isOpen: boolean = false;
  @Output() contactClosed = new EventEmitter()

  contactForm: FormGroup;

  subject: string = '';
  message: string = '';

  emailFocus: boolean = false;
  subjectFocus: boolean = false;
  messageFocus: boolean = false;

  constructor(private fb: FormBuilder,
              private gmSerivce: GlobalMessageService) { }

  ngOnInit() {
    this.isOpen = true;

    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(Utilities.getEmailPattern())]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  ngOnDestroy(){

  }

  windowClosed(event: AnimationEvent): void{
    if(event.toState === 'void'){
      this.contactClosed.emit(false);
    }
  }

  close(): void{
    this.isOpen = false;
  }

  submitMessage(): void{
    this.gmSerivce.addMessage("Thank you for your message! We will get back to you asap!", "info");
    this.close();
  }
}

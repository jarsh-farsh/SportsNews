import { Component, OnInit, Input, Output, EventEmitter, HostBinding, OnDestroy, ElementRef } from '@angular/core';
import { trigger, transition, useAnimation, AnimationEvent } from '@angular/animations';
import { slideYAndAppear, slideYAndDisappear } from '../../animations.component';
import { Subscription, fromEvent } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/Services/data/auth.service';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.css'],
  animations: [
    trigger('slideAppear', [
      transition(':enter', [
        useAnimation(slideYAndAppear, {
          params: { from: '-75px', to: '-60px', timing: '200ms ease-in-out'}
        })
      ]),
      transition(':leave', [
        useAnimation(slideYAndDisappear, {
          params: { from: '-60px', to: '-75px', timing: '200ms ease-in-out'}
        })
      ])
    ])
  ]
})
export class UserDropdownComponent implements OnInit, OnDestroy {

  @Input() closing: boolean;
  @Output() showUserDropDownChange = new EventEmitter();

  isOpen:boolean;

  animationDisabled:boolean;
  onWindowSizeChange: Subscription;
  onPageChange: Subscription;
  onClickOutsideWindow: Subscription;

  initialClick:boolean = false;

  get isLoggedIn(){
    return this.authService.currentUser !== null;
  }

  get currentUser(){
    return this.authService.currentUser;
  }

  constructor(private authService: AuthService,
              private router: Router,
              private el: ElementRef) { }

  ngOnInit() {
    this.isOpen = true;

    this.checkAnimation();
    this.onWindowSizeChange = 
      fromEvent(window, 'resize')
      .subscribe((event) => {
         this.checkAnimation();
      })

    
    this.onClickOutsideWindow = 
      fromEvent(window, 'click')
      .subscribe((event) => {
        if(!this.initialClick){
          this.initialClick = true;
        }else{
          if(!this.el.nativeElement.contains(event.target)){
            this.toggleClose();
          }
        }
    })

    this.checkForPageChange();
  }

  ngOnDestroy() {
    this.onWindowSizeChange.unsubscribe();
    this.onPageChange.unsubscribe();
    this.onClickOutsideWindow.unsubscribe();
  }

  logout(){
    this.toggleClose();
    this.authService.logout();
  }

  checkForPageChange(): void{
    this.onPageChange = this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.showUserDropDownChange.emit(false);
      }
    })
  }

  checkAnimation(): void{
    var width = window.innerWidth;
    if(width <= 572){
      this.animationDisabled = true;
    }else{
      this.animationDisabled = false;
    }
  }

  toggleClose(): void{
    this.isOpen = false;
  }

  closeUser(event : AnimationEvent){
    if(event.toState === 'void'){
      this.showUserDropDownChange.emit(false);
    }
  }
}

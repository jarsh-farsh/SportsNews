import { Component, OnInit, ElementRef, OnDestroy, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { useAnimation, trigger, transition, AnimationEvent } from '@angular/animations';

import { SideNavService } from 'src/app/Services/layout/side-nav.service';
import { WindowService } from 'src/app/Services/window.service';

import { slideXAndAppear, slideXAndDisappear } from '../../animations.component';
import { Router, NavigationEnd } from '@angular/router';
import { TitleService } from 'src/app/Services/title.service';


@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  animations:[
    trigger('openCloseSideNav', [
      transition(':enter', [
        useAnimation(slideXAndAppear, {
          params: { from: '-250px', timing: '200ms ease-in-out'}
        })
      ]),
      transition(':leave', [
        useAnimation(slideXAndDisappear, {
          params: { to: '-250px', timing: '200ms ease-in-out'}
        })
      ])
    ])
  ]
})

export class SideNavComponent implements OnInit, OnDestroy {

  initialClick: boolean = false;
  closing: boolean = false;
  isOpen: boolean;

  //Drop down objects
  dropDownLinks: DropDown[] = [];
  newsDropDown: DropDown;

  //Events
  clickEvent:Subscription;
  onPageChange: Subscription;

  constructor(private sideNavService: SideNavService,
              private windowService: WindowService,
              private titleService: TitleService,
              private router: Router,
              private eleRef: ElementRef) { }

  ngOnInit() {

    //Initialize drop down links
    this.initializeDropDownLinks();

    //Checks to see if user clicks outside of the side menu
    //If they do, then close the menu
    this.checkForClickOutsideComponent();

    //Closes side nav after page change
    this.checkForPageChange();
  }

  ngOnDestroy(){
    this.clickEvent.unsubscribe();
    this.onPageChange.unsubscribe();
  }

  initializeDropDownLinks(): void{
    this.newsDropDown = new DropDown(); 
    this.newsDropDown.linkNames = ["leagues", "find a league", "promote your event"]
    this.newsDropDown.links = ["leagues", "", "promo"];
    this.newsDropDown.linkIcon = ["fa fa-users", "fa fa-volleyball-ball", "fas fa-audio-description"];
    this.dropDownLinks.push(this.newsDropDown);

    //Check to see if current active link is contained within drop down
    this.isLinkInDropDown(this.titleService.pageTitle);
  }
  checkForClickOutsideComponent(): void{
    if(!this.clickEvent){
      this.clickEvent = fromEvent(document, 'click').subscribe(event => {
        if(this.initialClick){
          if (!this.eleRef.nativeElement.contains(event.target)) {
            if(this.closing === false){
              this.toggleClose();
            }
          }
        }else{
          this.isOpen = true;
          this.initialClick = true;
        }
      })
    }
  }
  checkForPageChange(): void{
    this.onPageChange = this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.toggleClose();
      }
    })
  }

  checkActiveLink(link: string): boolean{
    return this.titleService.pageTitle.toLocaleLowerCase() === link;
  }

  isLinkInDropDown(link: string): boolean{

    for(var i = 0; i < this.dropDownLinks.length; i++){
      if(this.dropDownLinks[i].linkNames.includes(link.toLocaleLowerCase()))
      {
        this.dropDownLinks[i].isOpen = true;
        return true;
      }
    }

    return false;
  }

  toggleClose(): void {
    this.isOpen = false;
  } 

  closeSideNav(event : AnimationEvent){
    //If the closing animation is complete, then toggle the side nav to be off
    //and also enable user input
    if(event.toState === 'void' && this.initialClick){
      this.sideNavService.toggleSideNav();
      this.windowService.enableUserInput();
    }
  }

  toggleDropDown(obj: DropDown): void{
    obj.isOpen = !obj.isOpen;
  }
}

class DropDown {
  isOpen: boolean;
  isAnimating: boolean;
  linkIcon: string[];
  links: string[];
  linkNames: string[];
}

import { Component, OnInit } from '@angular/core';
import { SideNavService } from 'src/app/Services/layout/side-nav.service';
import { WindowService } from 'src/app/Services/window.service';
import { GlobalMessageService } from 'src/app/Services/layout/global-message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showUserDropDown: boolean = false;
  closingUserDropDown: boolean = false;

  showContact: boolean = false;

  get showSideNav(): boolean{
    return this.sideNavService.showSideNav;
  }

  get globalMessages() {
    return this.gmSerivce.messages;
  }

  constructor(private sideNavService: SideNavService,
              private gmSerivce: GlobalMessageService,
              private windowService: WindowService) { }

  ngOnInit() {
  }

  toggleUserDropDown(): void{
    if(this.closingUserDropDown) return;

    if(!this.showUserDropDown){
      this.showUserDropDown = true;
      return;
    }

    this.closingUserDropDown = true;
  }

  userDropDownClosed(): void{
    this.closingUserDropDown = false;
    this.showUserDropDown = false;
  }

  toggleSideNav(): void{
    this.sideNavService.toggleSideNav();

    if(this.sideNavService.showSideNav) {
      this.windowService.disableUserInput();
    }
  }

  toggleContact(): void{
    this.showContact = !this.showContact;

    if(this.showContact === true) {
      this.windowService.disableUserInput();
    }else{
      this.windowService.enableUserInput();
    }
  }

}

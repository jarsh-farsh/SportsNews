import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  showSideNav = false;

  constructor() { }

  toggleSideNav(): void {
    this.showSideNav = !this.showSideNav;
  }
}

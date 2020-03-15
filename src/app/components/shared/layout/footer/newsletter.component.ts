import { Component, OnInit } from '@angular/core';
import { WindowService } from 'src/app/Services/window.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

  showNewsletterWindow: boolean = false;

  constructor(private windowService: WindowService) { }

  ngOnInit() {
  }

  toggleNewsletterDialog(): void {
    this.showNewsletterWindow = !this.showNewsletterWindow;

    if (this.showNewsletterWindow === true) {
      this.windowService.disableUserInput();
    } else {
      this.windowService.enableUserInput();
    }
  }
}

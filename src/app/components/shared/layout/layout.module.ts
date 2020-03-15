import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './header/side-nav.component';
import { UserDropdownComponent } from './header/user-dropdown.component';
import { NewsletterComponent } from './footer/newsletter.component';
import { AnimationsComponent } from '../animations.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared.module';
import { NewsletterPopupComponent } from './footer/newsletter-popup.component';
import { GlobalMessageComponent } from './header/global-message.component';

@NgModule({
    declarations: [
      HeaderComponent,
      FooterComponent,
      SideNavComponent,
      UserDropdownComponent,
      NewsletterComponent,
      AnimationsComponent,
      NewsletterPopupComponent,
      GlobalMessageComponent
    ],
    imports: [
      RouterModule,
      BrowserAnimationsModule,
      SharedModule
    ],
    exports:[
        HeaderComponent,
        FooterComponent
    ]
  })
  export class LayoutModule { }
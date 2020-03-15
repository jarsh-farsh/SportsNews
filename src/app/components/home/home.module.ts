import { NgModule } from '@angular/core';

import { HomeComponent } from "./home.component";
import { HomeArticlesComponent } from './articles.component';
import { LeagueInfoComponent } from './league-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighlightsComponent } from './highlights.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    declarations: [
      HomeComponent,
      HomeArticlesComponent,
      LeagueInfoComponent,
      HighlightsComponent
    ],
    imports: [
      BrowserAnimationsModule,
      HomeRoutingModule
    ],
    exports:[]
})
export class HomeModule { }
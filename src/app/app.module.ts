import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutModule } from './components/shared/layout/layout.module';
import { HomeModule } from './components/home/home.module';
import { ErrorComponent } from './components/shared/error/error.component';

import { ArticlesModule } from './components/articles/articles.module';
import { HighlightsModule } from './components/highlights/highlights.module';
import { LeaguesModule } from './components/leagues/leagues.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './components/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LayoutModule,
    HomeModule,
    ArticlesModule,
    HighlightsModule,
    LeaguesModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

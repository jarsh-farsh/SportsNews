import { NgModule } from '@angular/core';
import { ArticlesComponent } from './articles.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import { SearchModule } from '../shared/search/search.module';
import { ArticleDetailsComponent } from './article-details.component';
import { NgxMdModule } from 'ngx-md';
import { SharedModule } from '../shared/shared.module';
import { TextareaDirective } from '../shared/directives/textarea.directive';
import { CommentComponent } from './comment.component';
import { CommentInputComponent } from './comment-input.component';

@NgModule({
    declarations: [
        ArticlesComponent,
        ArticleDetailsComponent,
        TextareaDirective,
        CommentComponent,
        CommentInputComponent
    ],
    imports: [
        NgxMdModule.forRoot(),
        ArticlesRoutingModule,
        SearchModule,
        SharedModule
    ],
    exports:[]
})
export class ArticlesModule { }
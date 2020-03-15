import { ArticlesComponent } from "./articles.component";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticleDetailsComponent } from './article-details.component';


const routes = [
    { path: 'articles', component: ArticlesComponent, data: {title: "Articles"}},
    { path: 'articles/a/:id', component: ArticleDetailsComponent, data: {title: ""}}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticlesRoutingModule {}
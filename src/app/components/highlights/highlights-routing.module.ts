import { HighlightsComponent } from "./highlights.component";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


const routes = [
    { path: 'highlights', component: HighlightsComponent, data: {title: 'Highlights'} }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HighlightsRoutingModule {}
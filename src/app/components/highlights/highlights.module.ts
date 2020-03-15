import { NgModule } from '@angular/core';
import { HighlightsComponent } from './highlights.component';
import { HighlightsRoutingModule } from './highlights-routing.module';
import { SearchModule } from '../shared/search/search.module';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../shared/pipes/SafeUrlPipe.Pipe';

@NgModule({
    declarations: [
        HighlightsComponent,
        SafeUrlPipe
    ],
    imports: [
        CommonModule,
        HighlightsRoutingModule,
        SearchModule
    ],
    exports:[]
})

export class HighlightsModule { }
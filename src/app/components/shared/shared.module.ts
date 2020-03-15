import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeedbackPipe } from './pipes/feedback.pipe';
import { ContactComponent } from './contact/contact.component';
import { InputDirective } from './directives/input.directive';
import { CustomFormsModule } from 'ng2-validation';

@NgModule({
    declarations:[
        FeedbackPipe,
        ContactComponent,
        InputDirective
    ],
    imports:[
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CustomFormsModule
    ],
    exports:[
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CustomFormsModule,
        //Components
        ContactComponent,
        //Pipes
        FeedbackPipe,
        //Directives
        InputDirective
    ]
})
export class SharedModule {}
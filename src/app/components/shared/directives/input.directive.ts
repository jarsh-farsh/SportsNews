import { Directive, ElementRef, HostListener, EventEmitter, Output } from "@angular/core";

@Directive({
    selector: '[appInput]'
})
export class InputDirective {

    @Output() onValueChanged = new EventEmitter();

    constructor(private el: ElementRef){

     }

    @HostListener('input') moveLabel() {
        
    }

    @HostListener('focus') focused() {
        this.onValueChanged.emit(true);
    }

    @HostListener('focusout') focusOut() {
        this.onValueChanged.emit(false)
    }
}
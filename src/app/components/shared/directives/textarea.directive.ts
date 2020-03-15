import { Directive, ElementRef, HostListener, Input } from "@angular/core";


@Directive({
    selector: '[appTextarea]'
})
export class TextareaDirective {

    private maxHeight = 560;

    @Input() set textInput(value: any){
        this.element.nativeElement.style.height = 'auto';
        this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + 'px';
    }

    constructor(private element: ElementRef){
        
    }

    // @HostListener('input') checkRows(){
    //     this.element.nativeElement.style.height = 'auto';
    //     this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + 'px';
    // }

}
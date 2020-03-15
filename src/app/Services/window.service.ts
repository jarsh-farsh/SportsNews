import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  private scrollingStyle: HTMLStyleElement;

  public inputDisabled: boolean;

  constructor() {
      this.inputDisabled = false;
      this.scrollingStyle = this.createScrollStyleElement();
   }

   public disableUserInput(): void{
    this.inputDisabled = true;
    this.disableScrolling();
   }

   public enableUserInput(): void{
    this.inputDisabled = false;
    this.enableScrolling();
   }

   public disableScrolling(): void {
    document.body.appendChild(this.scrollingStyle);
   }

   public enableScrolling(): void {
    document.body.removeChild(this.scrollingStyle);
   }

   private createScrollStyleElement(): HTMLStyleElement {

    var style = document.createElement("style");
    style.type = "text/css";
    style.textContent = "body { overflow: hidden !important; }";

    return style;
   }
}

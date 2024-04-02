import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[inputUpperCase]'
})
export class UpperCaseDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input') onInput() {
    let value: string = this.el.nativeElement.value;
    this.el.nativeElement.value = value.toUpperCase();
  }

}

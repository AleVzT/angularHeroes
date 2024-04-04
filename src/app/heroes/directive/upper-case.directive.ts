import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[inputUpperCase]'
})
export class UpperCaseDirective {

  constructor(private ngControl: NgControl) { }

  @HostListener('input') onInput() {
    const value: string = this.ngControl.value;
    this.ngControl.control.setValue(value.toUpperCase(), { emitEvent: false });
  }
}

import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMinNumber]'
})
export class MinNumberDirective {
  @Input()
  public Type: string;

  @Input()
  public max: number;
  min = 0;
  constructor(private ref: ElementRef) { }

  @HostListener('input', ['$event'])
  public onInput(a_Event: InputEvent): void {
    let val = parseInt(this.ref.nativeElement.value);
    if (this.max !== null && this.max !== undefined && val >= this.max)
      this.ref.nativeElement.value = this.max.toString();
    else if (this.min !== null && this.min !== undefined && val <= this.min)
      this.ref.nativeElement.value = 1;
  }
}

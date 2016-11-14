import { Directive, ElementRef, Input, Renderer, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appMyHighlight]'
})
export class MyHighlightDirective {

  constructor(private el: ElementRef, private renderer: Renderer) {}

  private _defaultColor = 'brown';

  @Input('appMyHighlight') colorFromBindingInHtml: string;
  @Input() set defaultColor(colorName: string) {
    this._defaultColor = colorName || this._defaultColor;
  }

  @HostListener('mouseenter') onMouseEnter() {
     this.highlight(this.colorFromBindingInHtml || this._defaultColor);
   }

  @HostListener('mouseleave') onMouseLeave() {
     this.highlight(null);
   }

   private highlight(color: string) {
    this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
     
   }

}

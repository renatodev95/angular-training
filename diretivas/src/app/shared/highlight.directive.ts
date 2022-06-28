import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  HostBinding,
  Input
} from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective {
  @HostListener('mouseenter') onMouseOver() {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseout') onMouseOut() {
    this.backgroundColor = this.defaultColor;
  }

  @HostBinding('style.backgroundColor') backgroundColor: string = '';

  @Input() defaultColor: string = 'white';
  @Input('highlight') highlightColor: string = 'yellow'; // usando inputProperty com o mesmo nome da diretiva para economizar codigo no template

  constructor() {}

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }
}

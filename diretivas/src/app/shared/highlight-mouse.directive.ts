import { Directive, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  @HostListener('mouseenter') onMouseOver() {
    /* O HostListener vai ficar escutando evento no hospedeiro da diretiva (neste caso a tag html) */

    // this._renderer.setStyle(this._elementRef.nativeElement, 'backgroundColor', 'yellow');
    this.backgroundColor = 'yellow';
  }

  @HostListener('mouseout') onMouseOut() {
    // this._renderer.setStyle(this._elementRef.nativeElement, 'backgroundColor', 'white');
    this.backgroundColor = 'white';
  }

  /* O HostBinding permite que seja feito o binding/associação de um atributo ou uma classe do html para uma variável */
  @HostBinding('style.backgroundColor') backgroundColor: string = '';

  constructor(
    // private _elementRef: ElementRef, 
    // private _renderer:Renderer2
    ) { }

}

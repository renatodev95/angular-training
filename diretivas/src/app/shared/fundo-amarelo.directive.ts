import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'p[fundoAmarelo]'
})
export class FundoAmareloDirective {

  constructor(private _elementRef: ElementRef, private _renderer:Renderer2) { 
    // console.log(this._elementRef);  --> loggar o elemento que está sendo referenciado
    // this._elementRef.nativeElement.style.backgroundColor = "yellow"; --> alterando o estilo diretamente no elemento (PERIGOSO!)
    this._renderer.setStyle(this._elementRef.nativeElement, 'backgroundColor', 'yellow'); // melhor prática para acessar o elemento e alterar seu estilo
  }

}

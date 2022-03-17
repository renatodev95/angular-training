import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css'],
})
export class DataBindingComponent implements OnInit {
  url: string = 'http://loiane.training';
  cursoAngular: boolean = true;
  urlImagem: string = 'http://lorempixel.com.br/400/200/nature';

  valorAtual: string = '';
  valorSalvo: string = '';

  isMouseOver: boolean = false;

  nomeDoCurso: string = 'Angular';

  valorInicial = 15;

  onMudouValor(evento: any) {
    console.log(evento.novoValor);
  }

  constructor() {}

  ngOnInit(): void {}

  getValor(): number {
    return 1;
  }

  getCurtirCurso(): boolean {
    return true;
  }

  botaoClicado(): void {
    alert('OI');
  }

  onKeyUp(evento: KeyboardEvent): void {
    this.valorAtual = (<HTMLInputElement>evento.target).value;
  }

  salvarValor(valor: any): void {
    this.valorSalvo = valor;
  }

  onMouseOut() {
    this.isMouseOver = !this.isMouseOver;
  }
}

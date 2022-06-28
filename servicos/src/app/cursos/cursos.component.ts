import { Component, OnInit } from '@angular/core';

import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  providers: [CursosService]
})
export class CursosComponent implements OnInit {

  cursos:string[] = [];

  constructor(private cursoService: CursosService) { 
  }

  ngOnInit(): void {
    this.cursos = this.cursoService.getCursos();
  }

}

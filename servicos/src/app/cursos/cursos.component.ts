import { Component, OnInit } from '@angular/core';

import { CursoService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos:string[] = [];

  constructor(private cursoService: CursoService) { 
  }

  ngOnInit(): void {
    this.cursos = this.cursoService.getCursos();
  }

}

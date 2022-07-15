import { Injectable } from '@angular/core';
import { Aluno } from './aluno';

@Injectable({
  providedIn: 'root',
})
export class AlunosService {
  private alunos: Aluno[] = [
    { id: 1, nome: 'Ofri Chedomir', email: 'ofrichedomir@email.com' },
    { id: 2, nome: 'Patariki Marek', email: 'patarikimarek@email.com' },
    { id: 3, nome: 'Gena Caspian', email: 'genacaspian@email.com' },
  ];

  getAlunos() {
    return this.alunos;
  }

  getAluno(id: number) {
    for (let aluno of this.alunos) {
      if (aluno.id == id) {
        return aluno;
      }
    }
    return null;
  }

  constructor() {}
}

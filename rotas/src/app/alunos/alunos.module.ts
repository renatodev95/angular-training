import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunosComponent } from './alunos.component';
import { AlunosRoutingModule } from './alunos.routing.module';

@NgModule({
    imports: [CommonModule, AlunosRoutingModule],
    exports: [],
    declarations: [AlunosComponent, AlunoFormComponent, AlunoDetalheComponent],
    providers: [],
})
export class AlunosModule { }

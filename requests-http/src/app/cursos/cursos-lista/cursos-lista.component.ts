import {Component, OnInit} from '@angular/core';
import {Curso} from "../curso";
import {CursosService} from "../cursos.service";
import {EMPTY, Observable, Subject} from "rxjs";
import {catchError} from "rxjs/operators";
import {AlertModalService} from "../../shared/alert-modal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(private service: CursosService, private alertService: AlertModalService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list()
      .pipe(
        catchError(error => {
          console.error(error);
          this.handleError();
          return EMPTY;
        })
      );
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }
}

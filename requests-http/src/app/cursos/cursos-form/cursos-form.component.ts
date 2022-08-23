import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CursosService} from "../cursos.service";
import {AlertModalService} from "../../shared/alert-modal.service";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
  preserveWhitespaces: true
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private alertService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     console.log(id);
    //     const curso$ = this.service.loadByID(id);
    //     curso$.subscribe(curso => {
    //     this.updateForm(curso);
    //     });
    //   }
    // );

    // this.route.params
    //   .pipe(
    //     map((params: any) => params['id']),
    //     switchMap(id => this.service.loadByID(id))
    //   )
    //   .subscribe((curso) => this.updateForm(curso));

    // concatMap --> ordem da requisicao importa
    // mergeMap --> ordem nao importa
    // exhaustMap --> casos de login

    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  // updateForm(curso) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   })
  // }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
      let msgSuccess = 'Curso criado com sucesso!'
      let msgError = 'Erro ao criar curso, tente novamente!'
      if (this.form.value.id) {
        msgSuccess = msgSuccess.replace('criado', 'atualizado');
        msgError = msgError.replace('criar', 'atualizar');
      }
      this.service.save(this.form.value).subscribe(
        success => {
          this.alertService.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        error => {
          this.alertService.showAlertDanger(msgError);
        }
      );

      // if (this.form.value.id) {
      //   this.service.update(this.form.value).subscribe(
      //     success => {
      //       this.alertService.showAlertSuccess('Curso atualizado com sucesso!');
      //       this.location.back();
      //     },
      //     error => this.alertService.showAlertDanger('Erro ao atualizar curso, tente novamente!'),
      //     () => console.log('update completo')
      //   )
      // } else {
      //   this.service.create(this.form.value).subscribe(
      //     success => {
      //       this.alertService.showAlertSuccess('Curso criado com sucesso!');
      //       this.location.back();
      //     },
      //     error => this.alertService.showAlertDanger('Erro ao criar curso, tente novamente!'),
      //     () => console.log('request completo')
      //   )
      // }
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}

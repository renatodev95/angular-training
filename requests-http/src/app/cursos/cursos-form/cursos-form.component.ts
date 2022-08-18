import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CursosService} from "../cursos.service";
import {AlertModalService} from "../../shared/alert-modal.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
  preserveWhitespaces: true
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private service: CursosService, private alertService: AlertModalService, private location: Location) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      this.service.create(this.form.value)
        .subscribe(
          success => {
            this.alertService.showAlertSuccess('Curso registrado com sucesso!');
            this.location.back();
          },
          error => this.alertService.showAlertDanger('Erro ao criar curso, tente novamente!'),
          () => console.log('request completo')
        )
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
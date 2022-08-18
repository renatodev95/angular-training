import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
  preserveWhitespaces: true
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]]
    });
  }

  hasError(field: string) {
    console.log(this.form.get(field).errors)
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}

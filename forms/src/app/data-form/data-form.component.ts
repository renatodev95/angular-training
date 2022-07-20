import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css'],
})
export class DataFormComponent implements OnInit {
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  }

  ngOnInit(): void {
    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null)
    // });

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    });
    // [Validators.required, Validators.min(3), Validators.max(20)]
  }

  onSubmit() {
    console.log(this.formulario)
    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .pipe(map(res => res))
      .subscribe(dados => {
          console.log(dados);
          // reseta form
          // this.formulario.reset();
          // this.resetar();
        },
        (error: any) => alert('erro'));
  }

  resetar() {
    this.formulario.reset();
  }

  aplicaCssErro(campo: any) {
    return {
      'needs-validation': this.verificaValidTouched(campo),
      'was-validated': this.verificaValidTouched(campo)
    };
  }

  verificaValidTouched(campo: any) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  // @ts-ignore
  verificaEmailInvalido(){
    let campoEmail = this.formulario.get('email');
    if (campoEmail.errors) {
      return campoEmail.errors.required && campoEmail.touched;
    }
  }
}

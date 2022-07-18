import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css'],
})
export class TemplateFormComponent implements OnInit {
  usuario: any = {
    nome: null,
    email: null,
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(form: any) {}

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: any) {
    return {
      'needs-validation': this.verificaValidTouched(campo),
      'was-validated': this.verificaValidTouched(campo),
    };
  }

  consultaCEP(cep: any) {
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep !== null && cep !== '') {
      //Expressão regular para validar o CEP.
      let validaCep = /^[0-9]{8}$/;
      //Valida o formato do CEP.
      if (validaCep.test(cep)) {
        //Consulta o webservice viacep.com.br/
        this.http
          .get(`https://viacep.com.br/ws/${cep}/json`)
          .pipe(map((dados: any) => dados))
          .subscribe((dados) => console.log(dados));
      }
    }
  }
}

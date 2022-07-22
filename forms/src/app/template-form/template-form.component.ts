import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConsultaCepService} from "../shared/services/consulta-cep.service";

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

  constructor(private http: HttpClient, private cepService: ConsultaCepService) {}

  ngOnInit(): void {}

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched;
  }

  onSubmit(formulario: any) {
    console.log(formulario);
    // enviando os dados do form para o endereco do resttest.com
    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
      .subscribe(dados => {
        console.log(dados);
        formulario.form.reset();
      })
  }

  aplicaCssErro(campo: any) {
    return {
      'needs-validation': this.verificaValidTouched(campo),
      'was-validated': this.verificaValidTouched(campo),
    };
  }

  consultaCEP(cep: any, form: any) {
    cep = cep.replace(/\D/g, '');
    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep).subscribe((dados) => this.populaDadosForm(dados, form))
    }
  }

  populaDadosForm(dados: any, formulario: any) {
    // formulario.setValue({
    //   nome: formulario.value.nome,
    //   email: formulario.value.email,
    //   endereco: {
    //     cep: dados.cep,
    //     numero: '',
    //     complemento: dados.complemento,
    //     rua: dados.logradouro,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     estado: dados.uf,
    //   },
    // });

    formulario.form.patchValue({
      endereco: {
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });
    // console.log(formulario);
  }

  resetaDadosForm(formulario: any) {
    formulario.form.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null,
      },
    });
  }
}

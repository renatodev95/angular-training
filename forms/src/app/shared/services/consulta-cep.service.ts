import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) {
  }

  consultaCEP(cep: string) {
    cep = cep.replace(/\D/g, '');
    if (cep !== null && cep !== '') {
      let validaCep = /^\d{8}$/;
      if (validaCep.test(cep)) {
        return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
      }
    }
    return of({});  // retornando Observable de vazio caso o cep seja inválido
  }
}

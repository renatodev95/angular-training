import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {EstadoBr} from "../models/estado-br";

@Injectable()
export class DropdownService {

  constructor(private http: HttpClient) {
  }

  getEstadosBr() {
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json').pipe();
  }
}

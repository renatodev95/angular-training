import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Curso} from './curso';
import {delay, take, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`

  constructor(private http: HttpClient) {
  }

  list() {
    return this.http.get<Curso[]>(this.API)
      .pipe(
        // delay(2000),
        tap(console.log)
      );
  }

  loadByID(id: number) {
    return this.http.get(`${this.API}/${id}`).pipe(take(1));
  }

  create(curso: Curso) {
    return this.http.post<Curso>(this.API, curso).pipe(take(1));
  }
}

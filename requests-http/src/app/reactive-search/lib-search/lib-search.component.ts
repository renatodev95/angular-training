import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  readonly FIELDS = 'name,description,version,homepage';
  queryField = new FormControl();
  results$: Observable<any>;
  total: number = 0;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.results$ = this.queryField.valueChanges
      .pipe(
        map(value => value.trim()), //mapeando e removendo todos os espaços do valor digitado no input
        filter(value => value.length > 1), //filtrando apenas os valores que estão no campo de pesquisa com o mínimo de 2 caracteres
        debounceTime(200), //aguardando 200 milisegundos para não fazer requições a cada letra digitada
        distinctUntilChanged(), //se o valor digitado for igual ao anterior, não será feita uma nova busca (somente se o valor mudar)
        //tap(value => console.log(value)),
        switchMap(value => this.http.get(this.SEARCH_URL, {params: {search: value, fields: this.FIELDS}})), //fazendo a busca passando o endpoint e os parametros sem precisar fazer concatenações
        tap((res: any) => this.total = res.total), //obtendo o valor total para exibir no HTML
        map((res: any) => res.results) //pegando do JSON somente os resultados que nos interessam e atribuindo ao Observable
      );
  }

  onSearch() {

    let value = this.queryField.value;
    if (value && (value = value.trim()) !== '') {

      const params_ = {
        search: value,
        fields: this.FIELDS
      };

      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', this.FIELDS);

      this.results$ = this.http.get(this.SEARCH_URL, {params})
        .pipe(
          tap((res: any) => this.total = res.total),
          map((res: any) => res.results)
        );
    }
  }
}

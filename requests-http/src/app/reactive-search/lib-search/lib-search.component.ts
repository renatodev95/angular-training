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
        map(value => value.trim()),
        filter(value => value.length > 1),
        debounceTime(200),
        distinctUntilChanged(),
        //tap(value => console.log(value)),
        switchMap(value => this.http.get(this.SEARCH_URL, {params: {search: value, fields: this.FIELDS}})),
        tap((res: any) => this.total = res.total),
        map((res: any) => res.results)
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

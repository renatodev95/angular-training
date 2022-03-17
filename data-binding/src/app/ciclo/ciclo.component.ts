import { Input } from '@angular/core';
import {
  Component,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.css'],
})
export class CicloComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{

  @Input() valorInicial: number = 10;

  constructor() {
    this.log('constructor');
  }

  ngOnChanges() {
    this.log('OnChanges');
  }

  ngOnInit(): void {
    this.log('ngOnInit');
  }

  ngDoCheck() {
    this.log('DoCheck');
  }

  ngAfterContentInit() {
    this.log('ngAfterContentInit');
  }

  ngAfterContentChecked() {
    this.log('AfterContentChecked');
  }

  ngAfterViewInit() {
    this.log('AfterViewInit');
  }

  ngAfterViewChecked() {
    this.log('AfterViewChecked');
  }

  ngOnDestroy() {
    this.log('OnDestroy');
  }

  private log(hook: string) {
    console.log(hook);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let values = value.split(' ');
    let result = '';
    for (let v of values) {
      result += this.capitalize(v);
      
    }
    return result;
  }

  capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() + ' ';
  }
}

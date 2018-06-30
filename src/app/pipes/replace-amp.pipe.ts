import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceAmp'
})
export class ReplaceAmpPipe implements PipeTransform {

  transform(value: string, args?: string): string {
    let val = value;
    if (args) {
      val = value.replace('&', args);
    } else {
      val = value.replace('&', 'and');
    }
    return val;
  }

}

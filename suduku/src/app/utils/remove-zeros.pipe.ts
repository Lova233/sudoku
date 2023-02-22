import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeZeros'
})
export class RemoveZerosPipe implements PipeTransform {

  transform(value: number): number | null {
    return value !== 0 ? value : null
  }

}

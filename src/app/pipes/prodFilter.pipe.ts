import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prodFilter',
  pure: false
})
export class ProdFilterPipe implements PipeTransform {
  transform(items: any[], filter: number): any {

    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.category === filter);
  }
}

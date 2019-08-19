import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'priceSort'
})
export class PriceSortPipe implements PipeTransform {
  transform(list: Product[]) {
    // console.log('value in pipe:', list);
    return bubbleSortRecursive(list);
  }
}

const bubbleSortRecursive = (arr: Product[], count = arr.length - 1) => {
  if (count === 0) {
    return arr;
  }
  for (let i = 0; i < count; i++) {
    if (arr[i].price < arr[i + 1].price) {
      let tmp = arr[i + 1];
      arr[i + 1] = arr[i];
      arr[i] = tmp;
    }
  }
  return bubbleSortRecursive(arr, count - 1);
};

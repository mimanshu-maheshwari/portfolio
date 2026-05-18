import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortby',
  standalone: false,
})
export class SortbyPipe implements PipeTransform {
  transform<T>(value: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
    if (!value || !key) return value;
    const sorted = [...value].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }
}

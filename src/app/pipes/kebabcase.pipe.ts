import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kebabcase',
  standalone: false,
})
export class KebabcasePipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    return value
      .trim()
      .toLowerCase()
      .replaceAll(/[^a-zA-Z0-9 ]/g, '')
      .replaceAll(' ', '-')
      .replaceAll(/[-]{2,}/g, '-');
  }
}

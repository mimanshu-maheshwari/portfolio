import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'snakecase',
  standalone: false,
})
export class SnakecasePipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    return value.trim().toLowerCase().replaceAll(' ', '_');
  }
}

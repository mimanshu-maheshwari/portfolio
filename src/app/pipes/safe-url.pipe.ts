import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
  standalone: false,
})
export class SafeUrlPipe implements PipeTransform {
  private domSanitizer: DomSanitizer = inject(DomSanitizer);

  transform(value: string, type: 'resource' | 'other' = 'other'): unknown {
    if (type === 'resource') {
      return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
    }
    return this.domSanitizer.bypassSecurityTrustUrl(value);
  }
}

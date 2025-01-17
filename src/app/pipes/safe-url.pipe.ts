import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
  standalone: false,
})
export class SafeUrlPipe implements PipeTransform {
  private domSanitizer: DomSanitizer = inject(DomSanitizer);

  transform(value: string): unknown {
    return this.domSanitizer.bypassSecurityTrustUrl(value);
  }
}

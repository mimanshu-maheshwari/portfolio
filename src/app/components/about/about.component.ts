import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AboutMe } from '../../models/about-me.model';
import { TypewriterService } from '../../services/typewriter.service';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  aboutMe!: AboutMe;
  whoami$!: Observable<string>;

  private typewriterService = inject(TypewriterService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private aboutService: AboutService = inject(AboutService);

  constructor() {
    this.aboutService.aboutMe$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (val) => {
          if (!val) {
            return;
          }
          this.aboutMe = val;
          if (this.aboutMe?.whoamiChips) {
            this.whoami$ = this.typewriterService
              .getTypewriterEffect(this.aboutMe.whoamiChips)
              .pipe(takeUntilDestroyed(this.destroyRef));
          }
        },
      });
  }

  isString(value: any) {
    return typeof value === 'string';
  }
}

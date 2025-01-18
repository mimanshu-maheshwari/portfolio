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
  private location: Location = inject(Location);
  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor() {
    const state = this.location.getState() as any;
    this.aboutMe = state.aboutMe;
    if (this.aboutMe?.whoamiChips) {
      this.whoami$ = this.typewriterService
        .getTypewriterEffect(this.aboutMe.whoamiChips)
        .pipe(takeUntilDestroyed(this.destroyRef));
    }
  }

  isString(value: any) {
    return typeof value === 'string';
  }
}

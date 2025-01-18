import { Location } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faAws,
  fab,
  faChrome,
  faDiscord,
  faFreeCodeCamp,
  faGithub,
  faGoogle,
  faHackerrank,
  faInstagram,
  faKaggle,
  faLinkedin,
  faMastodon,
  faMedium,
  faMicrosoft,
  faStackOverflow,
} from '@fortawesome/free-brands-svg-icons';
import { faContactCard, far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AboutMe } from '../../models/about-me.model';
import { TypewriterService } from '../../services/typewriter.service';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  protected aboutMe!: AboutMe;
  private typewriterService = inject(TypewriterService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private library: FaIconLibrary = inject(FaIconLibrary);
  private aboutService: AboutService = inject(AboutService);
  whoami$!: Observable<string>;

  constructor() {
    this.aboutService.aboutMe$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (val) => {
          if (!val) {
            return;
          }
          this.aboutMe = val;
          this.whoami$ = this.typewriterService
            .getTypewriterEffect(this.aboutMe.whoamiChips)
            .pipe(takeUntilDestroyed(this.destroyRef));
        },
      });
    this.library.addIconPacks(fas, far, fab);
    this.library.addIcons(
      faGithub,
      faMedium,
      faLinkedin,
      faInstagram,
      faGoogle,
      faMicrosoft,
      faMastodon,
      faStackOverflow,
      faChrome,
      faAws,
      faKaggle,
      faDiscord,
      faContactCard,
      faHackerrank,
      faFreeCodeCamp,
    );
  }
}

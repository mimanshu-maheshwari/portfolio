import { Location } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faAws,
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
import { faContactBook, faContactCard } from '@fortawesome/free-regular-svg-icons';
import { Observable } from 'rxjs';
import { AboutMe } from '../../models/about-me.model';
import { TypewriterService } from '../../services/typewriter.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  protected aboutMe!: AboutMe;
  private location: Location = inject(Location);
  private typewriterService = inject(TypewriterService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  whoami$!: Observable<string>;
  whoamiText: string = '207 Multi-Status';
  whoamiChips: Array<string> = [
    '207 Multi-Status',
    'Fullstack Developer',
    'Team Player',
    'Software Developer',
    "418 I'm a teapot",
    'Frontend Engineer',
    '422 Unprocessable Content',
    'Backend Engineer',
    'Software Engineer',
    'Code Enthusiast',
    // '226 IM Used',
    'Generative AI Enthusiast',
    'Rustacean',
  ];
  avatarImage = './image/profile_image3.jpg';
  constructor(library: FaIconLibrary) {
    const state = this.location.getState() as any;
    this.aboutMe = state.aboutMe;
    library.addIcons(
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
    this.whoami$ = this.typewriterService
      .getTypewriterEffect(this.aboutMe.whoamiChips)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }
}

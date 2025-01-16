import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { TypewriterService } from '../../services/typewriter.service';
import {
  faStackOverflow,
  faGithub,
  faMedium,
  faLinkedin,
  faInstagram,
  faGoogle,
  faMicrosoft,
} from '@fortawesome/free-brands-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit, OnDestroy {
  private typewriterService = inject(TypewriterService);
  whoami$!: Subscription;
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
    library.addIcons(faGithub, faMedium, faLinkedin, faInstagram, faGoogle, faMicrosoft);
  }

  ngOnInit(): void {
    this.whoami$ = this.typewriterService
      .getTypewriterEffect(this.whoamiChips)
      .pipe(map((text) => text))
      .subscribe({ next: (val) => (this.whoamiText = val) });
  }

  ngOnDestroy(): void {
    this.whoami$.unsubscribe();
  }
}

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { AboutMe } from '../../models/about-me.model';
import { TypewriterService } from '../../services/typewriter.service';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'app-about',
  standalone: false,

  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit, OnDestroy {
  private typewriterService = inject(TypewriterService);
  private aboutMe!: AboutMe;
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

  // currentPhraseIndex: number = 0;
  // currentCharIndex: number = 0;
  // isDeleting: boolean = false;
  // typingSpeed: number = 100;
  // deletingSpeed: number = 50;
  // delayBetweenPhrases: number = 1000;
  // options = {
  //   strings: this.whoamiChips,
  //   typeSpeed: this.typingSpeed,
  //   backSpeed: this.deletingSpeed,
  //   showCursor: true,
  //   cursorChar: '|',
  //   loop: true,
  // };
  avatarImage = './image/profile_image3.jpg';

  private aboutService = inject(AboutService);

  ngOnInit(): void {
    this.aboutService.getAboutMeDetails().subscribe({
      next: (aboutMe) => {
        this.aboutMe = aboutMe;
        console.debug(this.aboutMe);
      },
      error: (err) => console.error(err),
      complete: () => console.log('completed about me'),
    });
    this.whoami$ = this.typewriterService
      .getTypewriterEffect(this.whoamiChips)
      .pipe(map((text) => text))
      .subscribe({ next: (val) => (this.whoamiText = val) });
  }

  ngOnDestroy(): void {
    this.whoami$.unsubscribe();
  }
}

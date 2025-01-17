import { Location } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AboutMe } from '../../models/about-me.model';
import { TypewriterService } from '../../services/typewriter.service';

@Component({
  selector: 'app-about',
  standalone: false,

  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit, OnDestroy {
  aboutMe!: AboutMe;
  whoami$!: Observable<string>;

  private typewriterService = inject(TypewriterService);
  private unsubscribeAll$: Subject<void> = new Subject();
  private location: Location = inject(Location);

  ngOnInit(): void {
    const state = this.location.getState() as any;
    this.aboutMe = state.aboutMe;
    this.unsubscribeAll$ = new Subject();
    this.whoami$ = this.typewriterService
      .getTypewriterEffect(this.aboutMe.whoamiChips)
      .pipe(takeUntil(this.unsubscribeAll$));
  }

  isString(value: any) {
    return typeof value === 'string';
  }

  ngOnDestroy(): void {
    let val = '';
    this.unsubscribeAll$.next();
  }
}

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

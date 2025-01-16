import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TypewriterService } from '../../services/typewriter.service';
import { map, Observable, Subscription } from 'rxjs';
import { MatCardAvatar } from '@angular/material/card';
import { TemplateEntity } from '@angular/compiler';

@Component({
  selector: 'app-about',
  standalone: false,

  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit, OnDestroy {
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
  currentPhraseIndex: number = 0;
  currentCharIndex: number = 0;
  isDeleting: boolean = false;
  typingSpeed: number = 100;
  deletingSpeed: number = 50;
  delayBetweenPhrases: number = 1000;
  options = {
    strings: this.whoamiChips,
    typeSpeed: this.typingSpeed,
    backSpeed: this.deletingSpeed,
    showCursor: true,
    cursorChar: '|',
    loop: true,
  };
  avatarImage = './image/profile_image3.jpg';

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

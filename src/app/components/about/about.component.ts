import { Component, inject, OnInit } from '@angular/core';
import { TypewriterService } from '../../services/typewriter.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-about',
  standalone: false,

  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  private typewriterService = inject(TypewriterService);
  //  implements OnInit, AfterViewInit {
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
    '226 IM Used',
    'Generative Ai Enthusias',
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

  whoamiText$ = this.typewriterService
    .getTypewriterEffect(this.whoamiChips)
    .pipe(map((text) => text));
}

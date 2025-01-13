import { Injectable } from '@angular/core';

export enum Theme {
  DARK = 'dark',
  SYSTEM = 'light dark',
  LIGHT = 'light',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themes: Theme[] = Object.values(Theme);
  private themeIndex: number =
    Number(localStorage.getItem('THEME')) || this.themes.indexOf(Theme.SYSTEM);

  constructor() {
    this.themeIndex = Number(localStorage.getItem('THEME')) || this.themes.indexOf(Theme.SYSTEM);
    this.applyTheme();
  }

  changeTheme(theme: number): void {
    this.themeIndex = theme;
    this.applyTheme();
  }

  get currentTheme(): number {
    return this.themeIndex;
  }

  private applyTheme(): void {
    const body = document.body;
    body.style.colorScheme = this.themes[this.themeIndex];
    localStorage.setItem('THEME', this.themeIndex.toString());
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkTheme: boolean = false;

  constructor() {
    this.darkTheme = true;
    this.applyTheme();
  }

  toggleTheme(): void {
    this.darkTheme = !this.darkTheme;
    this.applyTheme();
  }

  get isDarkTheme(): boolean {
    return this.darkTheme;
  }

  private applyTheme(): void {
    // const body = document.body;
    // if (this.darkTheme) {
    //   body.classList.add('dark-theme');
    //   body.classList.remove('light-theme');
    // } else {
    //   body.classList.add('light-theme');
    //   body.classList.remove('dark-theme');
    // }
  }
}

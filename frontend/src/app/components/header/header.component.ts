import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbCollapseModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isCollapsed = true; // Controls the hamburger menu
  isDarkMode = false; // Controls the theme

  // Toggle between dark and light mode
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }
}

import { Component, Output, EventEmitter, Input } from '@angular/core';
import { HeaderLink } from '../../../models/header-link.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isDarkTheme = false;
  @Input() links!: Array<HeaderLink>;

  @Output('sidenav-toggle') sidenavToggle: EventEmitter<never> = new EventEmitter<never>();

  constructor(public route: ActivatedRoute) {}

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    // Add logic to switch the theme (e.g., toggle CSS classes or use Angular Material's theming).
  }
}

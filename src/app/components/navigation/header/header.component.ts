import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import { HeaderLink } from '../../../models/header-link.model';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() links!: Array<HeaderLink>;

  @Output('sidenav-toggle') sidenavToggle: EventEmitter<never> = new EventEmitter<never>();
  route = inject(ActivatedRoute);
  themeService = inject(ThemeService);

  constructor() {}

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
}

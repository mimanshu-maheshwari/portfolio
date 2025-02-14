import {
  Component,
  Output,
  EventEmitter,
  Input,
  inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { HeaderLink } from '../../../models/header-link.model';
import { ActivatedRoute } from '@angular/router';
import { Theme, ThemeService } from '../../../services/theme.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { AboutMe } from '../../../models/about-me.model';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() links!: Array<HeaderLink>;
  @Input() aboutMe!: AboutMe;

  @Output('sidenav-toggle') sidenavToggle: EventEmitter<never> = new EventEmitter<never>();

  route = inject(ActivatedRoute);
  themeService = inject(ThemeService);

  constructor() {}

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  onThemeChange(event: number): void {
    this.themeService.changeTheme(event);
  }
}

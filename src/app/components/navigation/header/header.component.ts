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
  @Input() links!: Array<HeaderLink>;

  @Output('sidenav-toggle') sidenavToggle: EventEmitter<never> = new EventEmitter<never>();

  constructor(public route: ActivatedRoute) {}

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
}

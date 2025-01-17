import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeaderLink } from '../../../models/header-link.model';
import { ActivatedRoute } from '@angular/router';
import { AboutMe } from '../../../models/about-me.model';

@Component({
  selector: 'app-sidenav-list',
  standalone: false,

  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.scss',
})
export class SidenavListComponent {
  @Input() links!: Array<HeaderLink>;
  @Input() aboutMe!: AboutMe;
  @Output('sidenav-close') sidenavClose: EventEmitter<never> = new EventEmitter<never>();

  constructor(public route: ActivatedRoute) {}

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };
}

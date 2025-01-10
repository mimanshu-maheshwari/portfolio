import { Component } from '@angular/core';
import { HeaderLink } from './models/header-link.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio';

  links: Array<HeaderLink> = [
    { title: 'About', link: './', fragment: 'about', icon: 'account_circle' },
    { title: 'Profiles', link: './', fragment: 'profiles', icon: 'code_blocks' },
    { title: 'Publications', link: './', fragment: 'publications', icon: 'article' },
    { title: 'Projects', link: './', fragment: 'projects', icon: 'folder_code' },
    { title: 'Contact', link: './', fragment: 'contact', icon: 'contact_page' },
  ];
}

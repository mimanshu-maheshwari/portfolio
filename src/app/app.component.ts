import { Component, inject, OnInit } from '@angular/core';
import { HeaderLink } from './models/header-link.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  links: Array<HeaderLink> = [
    { title: 'About', link: './', fragment: 'about', icon: 'account_circle' },
    { title: 'Profiles', link: './', fragment: 'profiles', icon: 'code_blocks' },
    { title: 'Projects', link: './', fragment: 'projects', icon: 'folder_code' },
    { title: 'Publications', link: './', fragment: 'publications', icon: 'article' },
    { title: 'Contact', link: './', fragment: 'contact', icon: 'contact_page' },
  ];

  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    this.route.fragment.subscribe({
      next: (fragment) => {
        if (fragment) {
          console.log(fragment);
          this.router.navigate(['./'], { fragment });
        }
      },
    });
  }
}

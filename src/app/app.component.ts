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
    { title: 'About', link: './about', fragment: '', icon: 'account_circle' },
    { title: 'Profiles', link: './profiles', fragment: '', icon: 'code_blocks' },
    { title: 'Projects', link: './projects', fragment: '', icon: 'folder_code' },
    { title: 'Publications', link: './publications', fragment: '', icon: 'article' },
    { title: 'Contact', link: './contact', fragment: '', icon: 'contact_page' },
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

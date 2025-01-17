import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AboutMe } from './models/about-me.model';
import { HeaderLink } from './models/header-link.model';
import { AboutService } from './services/about.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  links: Array<HeaderLink> = [
    { title: 'About', link: './about', fragment: '', icon: 'account_circle' },
    { title: 'Profiles', link: './profiles', fragment: '', icon: 'code_blocks' },
    { title: 'Projects', link: './projects', fragment: '', icon: 'folder_code' },
    { title: 'Publications', link: './publications', fragment: '', icon: 'article' },
    { title: 'Contact', link: './contact', fragment: '', icon: 'contact_page' },
  ];

  private aboutService = inject(AboutService);
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  protected aboutMe$: Observable<AboutMe> = this.aboutService.getAboutMeDetails().pipe(
    tap((value) => {
      console.log(value);
      if (!value.profiles?.length) {
        this.links = this.links.map((l) => {
          if (l.title.toLocaleLowerCase() === 'profiles') {
            l.hidden = true;
          }
          return l;
        });
      }
      if (!value.publications?.length) {
        this.links = this.links.map((l) => {
          if (l.title.toLocaleLowerCase() === 'publications') {
            l.hidden = true;
          }
          return l;
        });
      }
    }),
  );
}

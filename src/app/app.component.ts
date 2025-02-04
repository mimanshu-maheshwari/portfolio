import { transition, trigger } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { left } from './aminations/left.animation';
import { right } from './aminations/right.animation';
import { AboutMe, Profile, ProfileType } from './models/about-me.model';
import { HeaderLink } from './models/header-link.model';
import { AboutService } from './services/about.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
  animations: [
    trigger('animRoutes', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ],
})
export class AppComponent {
  links: Array<HeaderLink> = [
    { title: 'About', link: './about', fragment: '', icon: 'account_circle' },
    {
      title: 'Profiles',
      link: './profiles',
      fragment: '',
      icon: 'code_blocks',
    },
    {
      title: 'Projects',
      link: './projects',
      fragment: '',
      icon: 'folder_code',
    },
    {
      title: 'Publications',
      link: './publications',
      fragment: '',
      icon: 'article',
    },
    { title: 'Contact', link: './contact', fragment: '', icon: 'contact_page' },
  ];

  protected animationState!: number;
  private aboutService = inject(AboutService);
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  protected aboutMe$: Observable<AboutMe> = this.aboutService
    .getAboutMeDetails()
    .pipe(
      tap((value) => {
        if (
          !value.profiles?.length ||
          !this.hasGitAndLeetcodeProfile(value.profiles)
        ) {
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
        if (!value.projects?.length) {
          this.links = this.links.map((l) => {
            if (l.title.toLocaleLowerCase() === 'projects') {
              l.hidden = true;
            }
            return l;
          });
        }
      }),
    );
  isMobile() {
    return false;
  }

  onActivate(value: any) {
    const state = this.router.getCurrentNavigation()?.extras.state || {
      routeIdx: 0,
    };
    // this.animationState = state['routeIdx'];
    this.animationState = this.route.firstChild?.snapshot.data['routeIdx'];
  }

  hasGitAndLeetcodeProfile(profiles: Array<Profile>): boolean {
    for (let profile of profiles) {
      if (
        profile.type === ProfileType.GITHUB ||
        profile.type === ProfileType.LEETCODE
      ) {
        return true;
      }
    }
    return false;
  }
}

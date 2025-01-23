import { Component, DestroyRef, inject } from '@angular/core';
import { Location } from '@angular/common';
import { AboutMe, Profile, ProfileType } from '../../models/about-me.model';
import { AboutService } from '../../services/about.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profiles',
  standalone: false,
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss',
})
export class ProfilesComponent {
  private aboutService: AboutService = inject(AboutService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  aboutMe!: AboutMe;

  leetcodeAvatar = './image/leetcode.png';
  githubAvatar = './image/github.png';
  leetcodeProfile?: Profile;

  githubProfile?: Profile;

  constructor() {
    this.aboutService.aboutMe$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (val) => {
          if (!val) {
            return;
          }
          this.aboutMe = val;
          this.leetcodeProfile = this.aboutMe.profiles?.find(
            (p) => p.type === ProfileType.LEETCODE,
          );
          this.githubProfile = this.aboutMe.profiles?.find(
            (p) => p.type === ProfileType.GITHUB,
          );
        },
      });
  }
}

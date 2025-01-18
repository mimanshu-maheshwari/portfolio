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
  leetcodeAvatar = './image/leetcode.png';
  aboutMe!: AboutMe;
  leetcodeProfile?: Profile;
  private aboutService: AboutService = inject(AboutService);
  private destroyRef: DestroyRef = inject(DestroyRef);

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
        },
      });
  }
}

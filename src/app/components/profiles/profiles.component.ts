import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { AboutMe, Profile, ProfileType } from '../../models/about-me.model';

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

  private location: Location = inject(Location);
  constructor() {
    const state = this.location.getState() as any;
    this.aboutMe = state.aboutMe;
    this.leetcodeProfile = this.aboutMe.profiles?.find(
      (p) => p.type === ProfileType.LEETCODE,
    );
  }
}

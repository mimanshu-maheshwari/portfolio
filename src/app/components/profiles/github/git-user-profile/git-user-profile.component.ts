import { Component, Input } from '@angular/core';
import { GitRepos } from '../../../../models/github/git-user.model';

@Component({
  selector: 'app-git-user-profile',
  standalone: false,

  templateUrl: './git-user-profile.component.html',
  styleUrl: './git-user-profile.component.scss',
})
export class GitUserProfileComponent {
  @Input() userAvatar!: string;
  @Input() userName!: string;
  @Input() name!: string;
  @Input() userRepos!: Array<GitRepos>;
}

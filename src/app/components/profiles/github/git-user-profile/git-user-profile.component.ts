import { Component, Input } from '@angular/core';

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
}

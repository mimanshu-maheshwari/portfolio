import { Component, Input } from '@angular/core';
import { Submission } from '../../../../models/leetcode-user-profile.model';

@Component({
  selector: 'app-submissions',
  standalone: false,

  templateUrl: './submissions.component.html',
  styleUrl: './submissions.component.scss',
})
export class SubmissionsComponent {
  @Input('recent-submissions') recentSubmissions!: Array<Submission>;
}

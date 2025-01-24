import { Component, Input } from '@angular/core';
import {
  HeatMapDataNode,
  TagProblemCounts,
  UserDataProfile,
} from '../../../../models/leetcode/leetcode.model';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  @Input() profile!: UserDataProfile;
  @Input() tagProblemCounts!: TagProblemCounts;
}

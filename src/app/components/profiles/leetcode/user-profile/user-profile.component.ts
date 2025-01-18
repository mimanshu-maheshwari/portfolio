import { Component, Input } from '@angular/core';
import { TagProblemCounts, UserDataProfile } from '../../../../models/leetcode.model';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  protected calendarData!: Array<{ date: Date; count: number }>;
  @Input() profile!: UserDataProfile;
  @Input() tagProblemCounts!: TagProblemCounts;
  @Input() set submissionCalendar(value: string) {
    let data = [];
    if (value) {
      let parsed = JSON.parse(value);
      for (let keyStr in parsed) {
        let key = Number(keyStr);
        let value = parsed[key];
        data.push({ date: new Date(key * 1000), count: value });
      }
      console.log(data);
      this.calendarData = data;
    }
  }
}

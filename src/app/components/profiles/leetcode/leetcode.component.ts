import { Component, OnInit } from '@angular/core';
import { MatchedUser } from '../../../models/leetcode-user-profile.model';
import { LeetcodeService } from '../../../services/leetcode.service';

@Component({
  selector: 'app-leetcode',
  standalone: false,
  templateUrl: './leetcode.component.html',
  styleUrl: './leetcode.component.scss',
})
export class LeetcodeComponent implements OnInit {
  userData!: MatchedUser;
  calendarData!: any;
  stats!: any;
  profile!: any;

  constructor(private leetcodeService: LeetcodeService) {}

  ngOnInit(): void {
    this.leetcodeService.getProfile('mimanshu-maheshwari').subscribe(({ data, loading }) => {
      this.userData = data.matchedUser as MatchedUser;
      this.calendarData = this.userData.submissionCalendar;
      this.stats = this.userData.submitStats;
      this.profile = this.userData.profile;
      // console.log(this.calendarData);
    });
  }
}

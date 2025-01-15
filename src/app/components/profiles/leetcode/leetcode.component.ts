import { Component, inject, OnInit } from '@angular/core';
import { MatchedUser, Submission } from '../../../models/leetcode-user-profile.model';
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
  recentSubmissions!: Array<Submission>;
  private leetcodeService: LeetcodeService = inject(LeetcodeService);

  ngOnInit(): void {
    this.leetcodeService.getProfile('mimanshu-maheshwari').subscribe(({ data, loading }) => {
      this.userData = data.matchedUser as MatchedUser;
      this.calendarData = this.userData.submissionCalendar;
      this.stats = this.userData.submitStats;
      this.profile = this.userData.profile;
      this.recentSubmissions = data.recentSubmissionList;
      console.log('check::keys', Object.keys(data));
      console.log('check::data', data);
    });
  }
}

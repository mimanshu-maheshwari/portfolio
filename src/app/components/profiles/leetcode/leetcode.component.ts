import { Component, inject, OnInit } from '@angular/core';
import {
  MatchedUser,
  QuestionsCount,
  Submission,
  SubmitStats,
} from '../../../models/leetcode-user-profile.model';
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
  stats!: SubmitStats;
  allQuestionsCount!: Array<QuestionsCount>;
  profile!: any;
  recentSubmissions!: Array<Submission>;
  private leetcodeService: LeetcodeService = inject(LeetcodeService);

  ngOnInit(): void {
    this.leetcodeService.getProfile('mimanshu-maheshwari').subscribe(({ data, loading }) => {
      // remove
      console.debug('check::data', data);

      // done
      this.userData = data.matchedUser;
      this.recentSubmissions = data.recentSubmissionList;
      this.allQuestionsCount = data.allQuestionsCount;

      // modify
      this.stats = this.userData.submitStats;
      this.calendarData = this.userData.submissionCalendar;
      this.profile = this.userData.profile;
    });
  }
}

import { Component, inject, OnInit } from '@angular/core';
import {
  MatchedUser,
  QuestionsCount,
  Submission,
  SubmitStats,
  TagProblemCounts,
  UserDataProfile,
} from '../../../models/leetcode.model';
import { LeetcodeService } from '../../../services/leetcode.service';

@Component({
  selector: 'app-leetcode',
  standalone: false,
  templateUrl: './leetcode.component.html',
  styleUrl: './leetcode.component.scss',
})
export class LeetcodeComponent implements OnInit {
  userData!: MatchedUser;
  calendarData!: string;
  stats!: SubmitStats;
  allQuestionsCount!: Array<QuestionsCount>;
  profile!: UserDataProfile;
  recentSubmissions!: Array<Submission>;
  tagProblemCounts!: TagProblemCounts;
  private leetcodeService: LeetcodeService = inject(LeetcodeService);

  ngOnInit(): void {
    this.leetcodeService.getProfile('mimanshu-maheshwari').subscribe(({ data, loading }) => {
      // done
      this.userData = data.matchedUser;
      this.recentSubmissions = data.recentSubmissionList;
      this.allQuestionsCount = data.allQuestionsCount;
      this.tagProblemCounts = this.userData.tagProblemCounts;
      this.calendarData = this.userData.submissionCalendar;

      // modify
      this.stats = this.userData.submitStats;
      this.profile = this.userData.profile;
    });
  }
}

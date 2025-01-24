import { Component, inject, Input, OnInit } from '@angular/core';
import {
  HeatMapDataNode,
  MatchedUser,
  QuestionsCount,
  Submission,
  SubmitStats,
  TagProblemCounts,
  UserDataProfile,
} from '../../../models/leetcode/leetcode.model';
import { LeetcodeService } from '../../../services/leetcode.service';

@Component({
  selector: 'app-leetcode',
  standalone: false,
  templateUrl: './leetcode.component.html',
  styleUrl: './leetcode.component.scss',
})
export class LeetcodeComponent implements OnInit {
  @Input() username!: string;
  userData!: MatchedUser;
  calendarData!: Array<HeatMapDataNode>;
  stats!: SubmitStats;
  allQuestionsCount!: Array<QuestionsCount>;
  profile!: UserDataProfile;
  recentSubmissions!: Array<Submission>;
  tagProblemCounts!: TagProblemCounts;
  private leetcodeService: LeetcodeService = inject(LeetcodeService);

  ngOnInit(): void {
    this.leetcodeService
      .getProfile(this.username)
      .subscribe(({ data, loading }) => {
        this.userData = data.matchedUser;
        this.recentSubmissions = data.recentSubmissionList;
        this.allQuestionsCount = data.allQuestionsCount;
        this.tagProblemCounts = this.userData.tagProblemCounts;
        const value = this.userData.submissionCalendar;
        let subData = [];
        if (value) {
          let parsed = JSON.parse(value);
          for (let keyStr in parsed) {
            let key = Number(keyStr);
            let value = parsed[key];
            subData.push({ date: new Date(key * 1000), count: value });
          }
          this.calendarData = subData;
        }
        this.stats = this.userData.submitStats;
        this.profile = this.userData.profile;
      });
  }
}

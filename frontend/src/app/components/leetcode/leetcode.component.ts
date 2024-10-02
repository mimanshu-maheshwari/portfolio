import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { LeetcodeService } from '../../services/leetcode.service';
import { CommonModule } from '@angular/common';
import { MatchedUser } from '../../models/leetcode-user-profile.model';
import { UserStatisticsComponent } from './user-statistics/user-statistics.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HeatmapComponent } from './heatmap/heatmap.component';

@Component({
  selector: 'app-leetcode',
  standalone: true,
  imports: [CommonModule, UserStatisticsComponent, UserProfileComponent, HeatmapComponent],
  templateUrl: './leetcode.component.html',
  styleUrl: './leetcode.component.scss',
})
export class LeetcodeComponent implements OnInit {
  userData!: MatchedUser;
  calendarData!: any;
  stats!: any;

  constructor(private leetcodeService: LeetcodeService) {}

  ngOnInit(): void {
    this.leetcodeService.getProfile('mimanshu-maheshwari').subscribe(({ data, loading }) => {
      this.userData = data.matchedUser as MatchedUser;
      this.calendarData = this.userData.submissionCalendar;
      this.stats = this.userData.submitStats;
      // console.log(this.calendarData);
    });
  }
}

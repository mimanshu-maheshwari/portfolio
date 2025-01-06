import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { LeetcodeService } from '../../services/leetcode.service';
import { CommonModule } from '@angular/common';
import { MatchedUser } from '../../models/leetcode-user-profile.model';
import { UserStatisticsComponent } from './user-statistics/user-statistics.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-leetcode',
  standalone: true,
  imports: [CommonModule, UserStatisticsComponent, UserProfileComponent, HeatmapComponent, NgbCarouselModule],
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

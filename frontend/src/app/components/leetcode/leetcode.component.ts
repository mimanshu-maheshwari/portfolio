import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { LeetcodeService } from '../../services/leetcode.service';
import { CommonModule } from '@angular/common';
import { MatchedUser } from '../../models/leetcode-user-profile.model';
// import { CalendarHeatmapModule } from 'ng-calendar-heatmap';

@Component({
  selector: 'app-leetcode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leetcode.component.html',
  styleUrl: './leetcode.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LeetcodeComponent implements OnInit {
  matchedUser!: MatchedUser;
  calendarData!: any;

  constructor(private leetcodeService: LeetcodeService) {}

  ngOnInit(): void {
    this.leetcodeService.getProfile('mimanshu-maheshwari').subscribe(({ data, loading }) => {
      this.matchedUser = data.matchedUser as MatchedUser;
      this.calendarData = this.matchedUser.submissionCalendar;
      // console.log(this.calendarData);
    });
  }
}

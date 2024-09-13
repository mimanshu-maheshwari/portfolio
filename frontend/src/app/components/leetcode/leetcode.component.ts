import { Component, OnInit } from '@angular/core';
import { LeetcodeService } from '../../services/leetcode.service';

@Component({
  selector: 'app-leetcode',
  standalone: true,
  imports: [],
  templateUrl: './leetcode.component.html',
  styleUrl: './leetcode.component.scss',
})
export class LeetcodeComponent implements OnInit {
  profile!: any;

  constructor(private leetcodeService: LeetcodeService) {}

  ngOnInit(): void {
    this.leetcodeService
      .getProfile('mimanshu-maheshwari')
      .subscribe(({ data, loading }) => {
        this.profile = data;
      });
  }
}

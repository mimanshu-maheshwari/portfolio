import { Component, OnInit } from '@angular/core';
import { LeetcodeService } from '../../services/leetcode.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leetcode',
  standalone: true,
  imports: [CommonModule],
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

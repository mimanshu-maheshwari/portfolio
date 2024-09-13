import { Component } from '@angular/core';
import { LeetcodeComponent } from '../leetcode/leetcode.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LeetcodeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

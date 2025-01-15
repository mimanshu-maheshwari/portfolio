import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Difficulty, QuestionsCount, SubmitStats } from '../../../../models/leetcode.model';

@Component({
  selector: 'app-user-statistics',
  standalone: false,
  templateUrl: './user-statistics.component.html',
  styleUrl: './user-statistics.component.scss',
})
export class UserStatisticsComponent {
  @Input() stats!: SubmitStats;
  @Input() allQuestionsCount!: Array<QuestionsCount>;
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;
  protected labels: Difficulty[] = Object.values(Difficulty);
  protected selectedDifficulty: Difficulty = this.labels[0];

  get allQuestionsDataset() {
    if (!this.stats?.acSubmissionNum || !this.allQuestionsCount?.length) {
      return {
        labels: [],
        datasets: [],
      };
    }
    const totalCount =
      this.allQuestionsCount.find((qc) => qc.difficulty === Difficulty.ALL)?.count || 0;
    const userCount =
      this.stats.acSubmissionNum.find((sub) => sub.difficulty === Difficulty.ALL)?.count || 0;
    return {
      labels: ['Solved', 'Remaining'],
      datasets: [{ data: [userCount, totalCount - userCount] }],
    };
  }

  get hardQuestionsDataset() {
    if (!this.stats?.acSubmissionNum || !this.allQuestionsCount?.length) {
      return {
        labels: [],
        datasets: [],
      };
    }
    const totalCount =
      this.allQuestionsCount.find((qc) => qc.difficulty === Difficulty.HARD)?.count || 0;
    const userCount =
      this.stats.acSubmissionNum.find((sub) => sub.difficulty === Difficulty.HARD)?.count || 0;
    return {
      labels: ['Solved', 'Remaining'],
      datasets: [{ data: [userCount, totalCount - userCount] }],
    };
  }

  get mediumQuestionsDataset() {
    if (!this.stats?.acSubmissionNum || !this.allQuestionsCount?.length) {
      return {
        labels: [],
        datasets: [],
      };
    }
    const totalCount =
      this.allQuestionsCount.find((qc) => qc.difficulty === Difficulty.MEDIUM)?.count || 0;
    const userCount =
      this.stats.acSubmissionNum.find((sub) => sub.difficulty === Difficulty.MEDIUM)?.count || 0;
    return {
      labels: ['Solved', 'Remaining'],
      datasets: [{ data: [userCount, totalCount - userCount] }],
    };
  }

  get easyQuestionsDataset() {
    if (!this.stats?.acSubmissionNum || !this.allQuestionsCount?.length) {
      return {
        labels: [],
        datasets: [],
      };
    }
    const totalCount =
      this.allQuestionsCount.find((qc) => qc.difficulty === Difficulty.EASY)?.count || 0;
    const userCount =
      this.stats.acSubmissionNum.find((sub) => sub.difficulty === Difficulty.EASY)?.count || 0;
    return {
      labels: ['Solved', 'Remaining'],
      datasets: [{ data: [userCount, totalCount - userCount] }],
    };
  }

  get solvedQuestionCount() {
    if (!this.stats?.acSubmissionNum) {
      return {
        labels: [],
        datasets: [],
      };
    }
    const labels = this.stats.acSubmissionNum
      .filter((sub) => sub.difficulty !== Difficulty.ALL)
      .map((sub) => sub.difficulty);
    const data = this.stats.acSubmissionNum
      .filter((sub) => sub.difficulty !== Difficulty.ALL)
      .map((sub) => sub.count);
    return {
      labels,
      datasets: [{ data }],
    };
  }

  updateSelected(dif: Difficulty) {
    this.selectedDifficulty = dif;
  }
}

import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-heatmap',
  standalone: false,
  templateUrl: './heatmap.component.html',
  styleUrl: './heatmap.component.scss',
})
export class HeatmapComponent {
  @Input() submissionCalendar!: Array<{ date: Date; count: number }>;
  @ViewChild('heatmapContainer', { static: true }) heatmapContainer!: ElementRef<any>;
}

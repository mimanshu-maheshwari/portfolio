import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-heatmap',
  standalone: false,
  templateUrl: './heatmap.component.html',
  styleUrl: './heatmap.component.scss',
})
export class HeatmapComponent {
  @ViewChild('heatmapContainer', { static: true })
  heatmapContainer!: ElementRef;
  @Input() submissionCalendar!: Array<{ date: Date; count: number }>;
}

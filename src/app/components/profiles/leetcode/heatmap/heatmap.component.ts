import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import CalHeatMap from 'cal-heatmap';

@Component({
  selector: 'app-heatmap',
  standalone: false,
  templateUrl: './heatmap.component.html',
  styleUrl: './heatmap.component.scss',
})
export class HeatmapComponent {
  @ViewChild('heatmapContainer', { static: true }) heatmapContainer!: ElementRef;
  @Input() submissionCalendar!: Array<{ date: Date; count: number }>;

  private cal: CalHeatMap; // Declare cal as an instance of the CalHeatMap class

  constructor() {
    this.cal = new CalHeatMap(); // Instantiate CalHeatMap
  }

  ngAfterViewInit(): void {
    if (!this.submissionCalendar) {
      return;
    }
    this.initializeHeatmap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.submissionCalendar) {
      return;
    }
    this.updateHeatmapData();
  }

  private initializeHeatmap(): void {
    if (!this.submissionCalendar) {
      return;
    }
    // Initialize CalHeatMap
    this.cal.init({
      itemSelector: '#cal-heatmap',
      domain: 'month', // You can customize this as per your needs
      range: 3, // Adjust range if needed
      data: [], // Placeholder for initial empty data
      cellSize: 20, // Size of each cell
    });
  }

  private updateHeatmapData(): void {
    if (!this.submissionCalendar) {
      return;
    }
    // Transform the input data to the format Cal-Heatmap expects
    const formattedData = this.submissionCalendar.map((item) => ({
      date: new Date(item.date).getTime(), // Convert date to timestamp
      value: item.count, // Use count as the value
    }));

    // Update CalHeatMap with new data
    this.cal.update({
      data: formattedData,
    });
  }
}

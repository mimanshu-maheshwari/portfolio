import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as d3 from 'd3';
import CalHeatmap from 'cal-heatmap';

@Component({
  selector: 'app-heatmap',
  standalone: false,
  templateUrl: './heatmap.component.html',
  styleUrl: './heatmap.component.scss',
})
export class HeatmapComponent implements OnChanges, AfterViewInit {
  @Input() submissionCalendar!: Array<{ date: Date; count: number }>;
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  width = 960;
  height = 136;
  cellSize = 17;
  data!: Map<string, number>; // Store processed data with date as key

  // Color scale
  color = d3
    .scaleQuantize<string>()
    .domain([-0.05, 0.05])
    .range(d3.range(11).map((d) => 'q' + d + '-11'));

  // Formatters
  formatPercent = d3.format('.1%');
  percent = d3.format('.1%');
  format = d3.timeFormat('%Y-%m-%d');

  // SVG container for each year
  svg!: d3.Selection<SVGGElement, number, d3.BaseType, unknown>;
  rect!: d3.Selection<SVGRectElement, string, SVGGElement, number>;

  ngOnInit() {
    let cal = new CalHeatMap();
    cal.init({
      itemSelector: '#cal-heatmap',
      domain: 'day',
      range: 1,
      displayLegend: false,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['submissionCalendar'].currentValue !== changes['submissionCalendar'].previousValue &&
      this.submissionCalendar
    ) {
      this.createChart();
    }
  }

  ngAfterViewInit(): void {
    if (this.submissionCalendar) {
      this.createChart();
    }
  }
  // Method to calculate the path for month outlines
  monthPath(t0: Date) {
    let t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = t0.getDay(),
      w0 = d3.timeWeek.count(d3.timeYear(t0), t0),
      d1 = t1.getDay(),
      w1 = d3.timeWeek.count(d3.timeYear(t1), t1);

    return (
      'M' +
      (w0 + 1) * this.cellSize +
      ',' +
      d0 * this.cellSize +
      'H' +
      w0 * this.cellSize +
      'V' +
      7 * this.cellSize +
      'H' +
      w1 * this.cellSize +
      'V' +
      (d1 + 1) * this.cellSize +
      'H' +
      (w1 + 1) * this.cellSize +
      'V' +
      0 +
      'H' +
      (w0 + 1) * this.cellSize +
      'Z'
    );
  }

  createChart() {
    const years = this.submissionCalendar.map((d) => d.date.getFullYear());
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    // Group and process input data into a Map
    this.data = new Map(
      this.submissionCalendar.map((d) => [this.format(d.date), d.count]), // Convert Date to string key
    );

    // Create SVG elements for each year
    this.svg = d3
      .select('#chart-container')
      .selectAll('svg')
      .data(d3.range(minYear, maxYear + 1)) // Use dynamic range of years
      .enter()
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('class', 'RdYlGn')
      .append('g')
      .attr('transform', `translate(${this.cellSize * 3.5}, 0)`);

    // Add year labels
    this.svg
      .append('text')
      .attr('transform', `translate(-6,${this.cellSize * 3.5})rotate(-90)`)
      .attr('text-anchor', 'middle')
      .text((d) => d);

    // Create a day rect for each date in each year

    // Add titles for tooltips
    this.rect = this.svg
      .selectAll('.day')
      .data((d: number) => d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
      .enter()
      .append('rect')
      .attr('class', 'day')
      .attr('width', this.cellSize)
      .attr('height', this.cellSize)
      .attr('x', (d) => d3.timeWeek.count(d3.timeYear(d), d) * this.cellSize)
      .attr('y', (d) => d.getDay() * this.cellSize)
      .attr('data-date', (d) => this.format(d)) // Store the formatted date as a data attribute
      .datum((d) => this.format(d)); // Use formatted date for subsequent operations

    // Add month paths
    this.svg
      .selectAll('.month')
      .data((d: number) => d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
      .enter()
      .append('path')
      .attr('class', 'month')
      .attr('d', (d) => this.monthPath(d));
  }

  // Render the chart with data
  render() {
    if (this.rect) {
      this.rect
        .filter((d) => this.data.has(d)) // Check if the formatted date is in the data map
        .attr('class', (d) => 'day ' + this.color(this.data.get(d)!)) // Apply color class
        .select('title')
        .text((d) => `${d}: ${this.percent(this.data.get(d)!)}`); // Tooltip text
    }
  }
}

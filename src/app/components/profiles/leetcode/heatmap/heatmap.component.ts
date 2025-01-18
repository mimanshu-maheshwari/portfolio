import {
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as d3 from 'd3';
import { HeatMapDataNode } from '../../../../models/leetcode.model';
import { ThemeService } from '../../../../services/theme.service';
@Component({
  selector: 'app-heatmap',
  standalone: false,
  templateUrl: './heatmap.component.html',
  styleUrl: './heatmap.component.scss',
})
export class HeatmapComponent implements OnChanges {
  @Input() submissionCalendar!: Array<HeatMapDataNode>;
  @Input() selectorId: string = 'heatmap';
  loaded: boolean = false;
  private elementRef: ElementRef = inject(ElementRef);
  private themeService: ThemeService = inject(ThemeService);

  width = 1100; // width of the chart
  cellSize = 20; // height of a day
  margin = 2.0;
  height = this.cellSize * 9; // height of a week (5 days + padding)

  // Define formatting functions for the axes and tooltips.
  // formatValue = d3.format('+.2%');
  // formatClose = d3.format('$,.2f');
  formatDate = d3.utcFormat('%x');
  formatDay = (i: number) => 'SMTWTFS'[i];
  formatMonth = d3.utcFormat('%b');

  // Helpers to compute a day’s position in the week.
  timeWeek = d3.utcMonday;
  countDay = (i: number) => (i + 7) % 7;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.submissionCalendar?.length) {
      this.loaded = false;
      // Preprocess the input data to include missing dates for all years
      const processedData = this.fillMissingDates(this.submissionCalendar);

      // Create the chart with the processed data
      this.createChart(processedData);

      this.loaded = true;
    }
  }

  createChart(data: Array<HeatMapDataNode>) {
    // Define scales
    // const max = d3.quantile(data, 0.9975, (d) => Math.abs(d.count)) || 1;
    const max = Math.max(...data.map((d) => d.count));
    // const color = d3.scaleSequential(d3.interpolateGreens).domain([0, max]);
    const color = d3
      .scaleSequentialSymlog(d3.interpolateGreens)
      .domain([0, max]);
    // Group data by year, in reverse input order. (Since the dataset is chronological,
    // this will show years in reverse chronological order.)
    const years = d3.groups(data, (d) => d.date.getUTCFullYear()).reverse();
    const svg = d3
      .select(this.elementRef.nativeElement)
      .select(`#${this.selectorId}`)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height * years.length)
      // .attr('background-color', 'white')
      .attr('viewBox', [0, 0, this.width, this.height * years.length])
      .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;');

    const year = svg
      .selectAll('g')
      .data(years)
      .join('g')
      .attr(
        'transform',
        (d, i) =>
          `translate(40.5,${
            this.height * (years.length - i - 1) + this.cellSize * 1.5
          })`,
      );
    // .attr(
    //   'transform',
    //   (d, i) => `translate(40.5,${this.height * i + this.cellSize * 1.5})`,
    // );

    year
      .append('text')
      .attr('fill', 'var(--mat-sys-on-surface)')
      .attr('x', -5)
      .attr('y', -5)
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'end')
      .text(([key]) => key);

    year
      .append('g')
      .attr('text-anchor', 'end')
      .selectAll()
      .data(d3.range(0, 7))
      .join('text')
      .attr('fill', 'var(--mat-sys-on-surface)')
      .attr('x', -5)
      .attr('y', (i) => (this.countDay(i) + 0.5) * this.cellSize)
      .attr('dy', '0.31em')
      .text(this.formatDay);

    year
      .append('g')
      .selectAll()
      .data(
        ([, values]) => values,
        // values.filter((d) => ![0, 6].includes(d.date.getUTCDay())),
      )
      .join('rect')
      .attr('width', this.cellSize - this.margin) // Adjust the width to account for the margin
      .attr('height', this.cellSize - this.margin) // Adjust the height to account for the margin
      // .attr('width', this.cellSize - 1)
      // .attr('height', this.cellSize - 1)
      .attr(
        'x',
        (d) =>
          this.timeWeek.count(d3.utcYear(d.date), d.date) * this.cellSize +
          this.margin / 2.0,
      )
      .attr(
        'y',
        (d) =>
          this.countDay(d.date.getUTCDay()) * this.cellSize + this.margin / 2.0,
      )
      // .attr('fill', (d) => color(d.count))
      .attr('fill', (d) => (d.count === 0 ? '#444' : color(d.count))) // Default to dark grey if no count or color
      .attr('stroke', '#ccc') // Light grey border color
      .attr('rx', 4) // Apply border-radius
      .attr('ry', 4) // Apply border-radius
      .append('title')
      .text((d) => `${this.formatDate(d.date)} | submissions: ${d.count}`);

    const month = year
      .append('g')
      .selectAll()
      .data(([_, values]) => {
        return d3.utcMonths(
          d3.utcMonth(values[0].date),
          (values.at(-1) || { date: new Date() }).date,
        );
      })
      .join('g');

    month
      .filter((d, i) => !!i)
      .append('path')
      .attr('fill', 'none')
      // .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .attr('stroke', '#ccc') // Light grey border color
      .attr('rx', 4) // Apply border-radius
      .attr('ry', 4)
      .attr('d', this.pathMonth);

    month
      .append('text')
      .attr('fill', 'var(--mat-sys-on-surface)')
      .attr(
        'x',
        (d) =>
          this.timeWeek.count(d3.utcYear(d), this.timeWeek.ceil(d)) *
            this.cellSize +
          2,
      )
      .attr('y', -5)
      .text(this.formatMonth);

    return Object.assign(svg.node() || {}, { scales: { color } });
  }

  // A function that draws a thin white line to the left of each month.
  pathMonth = (t: Date) => {
    const d = Math.max(0, Math.min(7, this.countDay(t.getUTCDay())));
    const w = this.timeWeek.count(d3.utcYear(t), t);
    return `${
      d === 0
        ? `M${w * this.cellSize},0`
        : d === 7
        ? `M${(w + 1) * this.cellSize},0`
        : `M${(w + 1) * this.cellSize},0V${d * this.cellSize}H${
            w * this.cellSize
          }`
    }V${7 * this.cellSize}`;
  };
  fillMissingDates(data: Array<HeatMapDataNode>): Array<HeatMapDataNode> {
    if (data.length === 0) {
      return [];
    }

    // Find the minimum and maximum years in the input data
    const minYear =
      d3.min(data, (d) => d.date.getUTCFullYear()) ||
      new Date().getUTCFullYear();
    const maxYear =
      d3.max(data, (d) => d.date.getUTCFullYear()) ||
      new Date().getUTCFullYear();

    // Generate a map of existing dates for quick lookup
    const dateMap = new Map(data.map((d) => [d.date.toISOString(), d]));

    // Generate all dates from the start of minYear to the end of maxYear
    const allDates: Array<HeatMapDataNode> = [];
    for (let year = minYear; year <= maxYear; year++) {
      const firstDayOfYear = new Date(Date.UTC(year, 0, 1)); // Jan 1st of the year
      const lastDayOfYear = new Date(Date.UTC(year, 11, 31)); // Dec 31st of the year

      // Generate all dates in this year
      const yearDates = d3.utcDays(firstDayOfYear, lastDayOfYear);

      // For each date in the year, either use the existing count or set it to 0
      yearDates.forEach((date) => {
        const existing = dateMap.get(date.toISOString());
        allDates.push(existing || { date, count: 0 });
      });
    }

    return allDates;
  }
}

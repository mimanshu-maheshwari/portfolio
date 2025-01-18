import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as d3 from 'd3';
import { HeatMapDataNode } from '../../../../models/leetcode.model';

@Component({
  selector: 'app-heatmap',
  standalone: false,
  templateUrl: './heatmap.component.html',
  styleUrl: './heatmap.component.scss',
})
export class HeatmapComponent implements OnChanges {
  @ViewChild('heatmapContainer', { static: true })
  heatmapContainer!: ElementRef;
  @Input() submissionCalendar!: Array<HeatMapDataNode>;
  @Input() selectorId: string = 'heatmap';

  width = 928; // width of the chart
  cellSize = 17; // height of a day
  height = this.cellSize * 7; // height of a week (5 days + padding)

  // Define formatting functions for the axes and tooltips.
  formatValue = d3.format('+.2%');
  formatClose = d3.format('$,.2f');
  formatDate = d3.utcFormat('%x');
  formatDay = (i: number) => 'SMTWTFS'[i];
  formatMonth = d3.utcFormat('%b');

  // Helpers to compute a day’s position in the week.
  timeWeek = d3.utcMonday;
  countDay = (i: number) => (i + 6) % 7;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.submissionCalendar?.length) {
      this.createChart(this.submissionCalendar);
    }
  }

  createChart(data: Array<HeatMapDataNode>) {
    // Define scales
    const colorScale = d3
      .scaleQuantize<string>()
      .domain([0, d3.max(data, (d) => d.count) || 1])
      .range(d3.schemeRdYlGn[9]);

    // const max = Math.max(...data.map((d) => d.count));
    // const min = Math.min(...data.map((d) => d.count));
    // const color = d3.scaleSequential(d3.interpolatePiYG).domain([min, max]);
    const svg = d3.select(`#${this.selectorId}`);
    console.log(svg);
    svg
      .select('rect')
      .data(data)
      .join(
        (enter) =>
          enter
            .append('rect')
            .attr(
              'x',
              (d) =>
                d3.timeWeek.count(d3.timeYear(d.date), d.date) * this.cellSize,
            )
            .attr('y', (d) => d.date.getDay() * this.cellSize)
            .attr('width', this.cellSize - 1)
            .attr('height', this.cellSize - 1)
            .attr('fill', (d) => colorScale(d.count))
            .append('title')
            .text((d) => `${d.date.toDateString()}: ${d.count}`),
        (update) =>
          update
            .attr('fill', (d) => colorScale(d.count))
            .select('title')
            .text((d) => `${d.date.toDateString()}: ${d.count}`),
        (exit) => exit.remove(),
      );

    // Add labels or axes if needed
    const xAxis = d3.axisBottom(
      d3.scaleTime().domain(d3.extent(data, (d) => d.date) as [Date, Date]),
    );
    svg
      .append('g')
      .attr('transform', `translate(0, ${this.height - 20})`)
      .call(xAxis);
  }
}

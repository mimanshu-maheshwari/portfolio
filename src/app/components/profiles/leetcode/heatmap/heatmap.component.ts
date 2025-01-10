import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-heatmap',
  standalone: true,
  imports: [],
  templateUrl: './heatmap.component.html',
  styleUrl: './heatmap.component.scss',
})
export class HeatmapComponent implements OnChanges {
  @Input() submissionCalendar: any;
  @ViewChild('heatmapContainer', { static: true }) heatmapContainer!: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.submissionCalendar) {
      this.renderHeatmap();
    }
  }

  renderHeatmap(): void {
    const data = this.processData();
    // console.debug('submission data', data);
    // Similar heatmap rendering logic as before
    const container = this.heatmapContainer.nativeElement;

    // Set up dimensions
    const width = 900;
    const height = 150;
    const cellSize = 15;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    // Clear any previous SVG elements
    d3.select(container).selectAll('*').remove();

    const svg = d3
      .select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Set the start and end dates for the heatmap (one year range)
    const startDate = d3.min(Object.keys(data).map((d) => new Date(d))) as Date;
    const endDate = d3.max(Object.keys(data).map((d) => new Date(d))) as Date;
    // console.debug('dates: ', startDate, endDate);

    // Create a range of days
    const days = d3.timeDays(
      new Date(startDate.getFullYear(), 0, 1),
      new Date(endDate.getFullYear() + 1, 0, 1),
    );
    // console.debug('days: ', days);
    // Calculate the day of week and week number
    const day = (d: Date) => d.getDay();
    const week = (d: Date) => d3.timeWeek.count(d3.timeYear(d), d);

    // Append day rectangles to the SVG
    svg
      .selectAll('.day')
      .data(days)
      .enter()
      .append('rect')
      .attr('class', 'day')
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('x', (d) => week(d) * (cellSize + 2))
      .attr('y', (d) => day(d) * (cellSize + 2))
      .attr('fill', '#ebedf0') // Default fill color
      .datum((d) => d);

    // Add month outlines
    svg
      .selectAll('.month')
      .data(
        d3.timeMonths(
          new Date(startDate.getFullYear(), 0, 1),
          new Date(endDate.getFullYear() + 1, 0, 1),
        ),
      )
      .enter()
      .append('path')
      .attr('class', 'month')
      .attr('d', (d) => {
        const t0 = new Date(d.getFullYear(), d.getMonth(), 1);
        const t1 = new Date(d.getFullYear(), d.getMonth() + 1, 1);
        return [
          `M${week(t0) * (cellSize + 2)},${day(t0) * (cellSize + 2)}`,
          `H${(week(t1) + 1) * (cellSize + 2)}`,
          `V${7 * (cellSize + 2)}`,
          `H${week(t0) * (cellSize + 2)}`,
          `Z`,
        ].join(' ');
      });

    // Color scale for the contributions
    const colorScale = d3
      .scaleQuantize<string>()
      .domain([0, d3.max(Object.values(data) as number[]) || 1])
      .range(['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']);

    // Update the color of the day rectangles based on data
    svg
      .selectAll('.day')
      .filter((d) => (d as Date).toISOString().split('T')[0] in data)
      .attr('fill', (d) => colorScale(data[(d as Date).toISOString().split('T')[0]]));

    // Add legend
    const legend = svg
      .append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width - 150}, ${height - 50})`);

    // Legend data should match the color range used in colorScale
    const legendData = [0, 1, 2, 3, 4];
    legend
      .selectAll('rect')
      .data(legendData)
      .enter()
      .append('rect')
      .attr('x', (d) => d * 30)
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('fill', (d) => colorScale(d * (d3.max(Object.values(data) as number[])! / 4)));

    legend
      .selectAll('text')
      .data(legendData)
      .enter()
      .append('text')
      .attr('x', (d) => d * 30 + 20)
      .attr('y', cellSize + 15)
      .attr('class', 'legend')
      .style('font-size', '12px')
      .text((d, i) => (i === 0 ? 'Less' : i === 4 ? 'More' : ''));
  }

  processData(): any {
    // Parse submissionCalendar as JSON and convert UNIX timestamps to date strings
    const rawData = JSON.parse(this.submissionCalendar);
    const processedData: { [key: string]: number } = {};

    for (const [timestamp, count] of Object.entries(rawData)) {
      const date = new Date(Number(timestamp) * 1000).toISOString().split('T')[0];
      processedData[date] = count as number;
    }

    return processedData;
  }
}

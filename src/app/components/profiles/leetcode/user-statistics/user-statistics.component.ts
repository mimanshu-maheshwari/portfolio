import { Component, Input, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-user-statistics',
  standalone: false,
  templateUrl: './user-statistics.component.html',
  styleUrl: './user-statistics.component.scss',
})
export class UserStatisticsComponent implements OnChanges {
  @Input() stats: any;
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.stats) {
      this.renderChart();
    }
  }

  renderChart(): void {
    const data = this.stats.totalSubmissionNum;
    const svg = d3
      .select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', 600)
      .attr('height', 300);

    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const chart = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(data.map((d: any) => d.difficulty));
    // y.domain([0, d3.max(data, (d: any) => d.submissions) || 0]);
    y.domain([0, d3.max(data as number[], (d: any) => d.submissions) || 0]);

    chart
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    chart.append('g').attr('class', 'axis axis--y').call(d3.axisLeft(y).ticks(10));

    chart
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: any) => x(d.difficulty)!)
      .attr('y', (d: any) => y(d.submissions))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => height - y(d.submissions));
  }
}

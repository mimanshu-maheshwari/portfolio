import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-heatmap',
  standalone: false,
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

  // createHeatmap(submissionCalendar: any) {
  //   const heatmapContainer = document.getElementById('heatmapChart');
  //   if (heatmapContainer) {
  //     heatmapContainer.innerHTML =
  //       '<h2 class="text-2xl font-bold text-white mb-4">Submission Heatmap</h2>'; // Clear existing content

  //     // Create container for the entire heatmap
  //     const container = document.createElement('div');
  //     container.className = 'flex flex-col gap-2';

  //     // Create month labels
  //     const monthsContainer = document.createElement('div');
  //     monthsContainer.className = 'flex text-xs text-gray-400 mb-1';
  //     const months = [
  //       'Jan',
  //       'Feb',
  //       'Mar',
  //       'Apr',
  //       'May',
  //       'Jun',
  //       'Jul',
  //       'Aug',
  //       'Sep',
  //       'Oct',
  //       'Nov',
  //       'Dec',
  //     ];
  //     months.forEach((month) => {
  //       const monthLabel = document.createElement('div');
  //       monthLabel.className = 'flex-1 text-center';
  //       monthLabel.textContent = month;
  //       monthsContainer.appendChild(monthLabel);
  //     });
  //     container.appendChild(monthsContainer);

  //     // Create grid container
  //     const gridContainer = document.createElement('div');
  //     gridContainer.className = 'flex gap-2';

  //     // Add day labels
  //     const dayLabels = document.createElement('div');
  //     dayLabels.className = 'flex flex-col gap-8 text-xs text-gray-400 pr-2';
  //     ['Mon', 'Wed', 'Fri'].forEach((day) => {
  //       const dayLabel = document.createElement('div');
  //       dayLabel.textContent = day;
  //       dayLabels.appendChild(dayLabel);
  //     });
  //     gridContainer.appendChild(dayLabels);

  //     // Process and create contribution grid
  //     const { weeks } = this.processCalendarData(submissionCalendar);
  //     const contributionGrid = document.createElement('div');
  //     contributionGrid.className = 'flex gap-1';

  //     weeks.forEach((week) => {
  //       const weekContainer = document.createElement('div');
  //       weekContainer.className = 'flex flex-col gap-1';

  //       week.forEach(({ date, count }) => {
  //         const cell = document.createElement('div');
  //         cell.className = `contribution-cell level-${this.getContributionLevel(count)}`;
  //         cell.title = `${date}: ${count} submissions`;
  //         weekContainer.appendChild(cell);
  //       });

  //       contributionGrid.appendChild(weekContainer);
  //     });

  //     gridContainer.appendChild(contributionGrid);
  //     container.appendChild(gridContainer);

  //     // Add legend
  //     const legendContainer = document.createElement('div');
  //     legendContainer.className = 'flex items-center gap-2 text-xs text-gray-400 mt-4';
  //     legendContainer.innerHTML = `
  //               <span>Less</span>
  //               <div class="flex gap-1">
  //                   <div class="contribution-cell level-0"></div>
  //                   <div class="contribution-cell level-1"></div>
  //                   <div class="contribution-cell level-2"></div>
  //                   <div class="contribution-cell level-3"></div>
  //                   <div class="contribution-cell level-4"></div>
  //               </div>
  //               <span>More</span>
  //           `;
  //     container.appendChild(legendContainer);

  //     heatmapContainer.appendChild(container);
  //   }
  // }

  // processCalendarData(submissionCalendar: any) {
  //   const weeks = [];
  //   let currentWeek = [];

  //   // Convert timestamps to date objects and sort them
  //   const dates = Object.keys(submissionCalendar)
  //     .map((timestamp) => ({
  //       date: new Date(timestamp * 1000),
  //       count: submissionCalendar[timestamp],
  //     }))
  //     .sort((a, b) => a.date - b.date);

  //   // Fill in missing dates with zero contributions
  //   const startDate = dates[0].date;
  //   const endDate = dates[dates.length - 1].date;
  //   const dateMap = new Map(dates.map((d) => [d.date.toISOString().split('T')[0], d.count]));

  //   for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
  //     const dateStr = d.toISOString().split('T')[0];
  //     const count = dateMap.get(dateStr) || 0;
  //     const dayOfWeek = d.getDay();

  //     if (dayOfWeek === 0 && currentWeek.length > 0) {
  //       weeks.push(currentWeek);
  //       currentWeek = [];
  //     }

  //     currentWeek.push({
  //       date: dateStr,
  //       count: count,
  //     });

  //     if (currentWeek.length === 7) {
  //       weeks.push(currentWeek);
  //       currentWeek = [];
  //     }
  //   }

  //   if (currentWeek.length > 0) {
  //     weeks.push(currentWeek);
  //   }

  //   return { weeks };
  // }

  // getContributionLevel(count: number) {
  //   if (count === 0) return 0;
  //   if (count <= 3) return 1;
  //   if (count <= 6) return 2;
  //   if (count <= 9) return 3;
  //   return 4;
  // }
}

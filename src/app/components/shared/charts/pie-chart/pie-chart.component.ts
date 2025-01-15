import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  standalone: false,

  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent {
  public chart: any;
  @Input() pieChartData!: ChartData<'pie', number[], string | string[]>;
  @Input() size: { height?: string; width?: string } = { height: '30em', width: '30em' };

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      // datalabels: {
      //   formatter: (value, ctx) => {
      //     if (ctx.chart.data.labels) {
      //       return ctx.chart.data.labels[ctx.dataIndex];
      //     }
      //     return '';
      //   },
      // },
    },
  };
  // public pieChartData: ChartData<'pie', number[], string | string[]> = {
  //   labels: [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'],
  //   datasets: [
  //     {
  //       data: [300, 500, 100],
  //     },
  //   ],
  // };
  public pieChartType: ChartType = 'pie';

  // events
  public chartClicked({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent; active: object[] }): void {
    console.log(event, active);
  }
}

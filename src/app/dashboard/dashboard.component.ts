import { Component, OnInit, ViewChild } from '@angular/core';
import { User, UserProfileService } from '../shared/user-profile.service';
import { Observable } from 'rxjs';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  imports: [NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'
  ]
})
export class DashboardComponent implements OnInit{
  selectedUserObservable$!: Observable<any>;
  selectedUser!: User;
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  constructor(public userProfileService: UserProfileService) {
    this.chartOptions = {
      series: [0.1, 0.1 , 0.1, 0.1, 0.1],   // initial data
      chart: {
        type: "pie",
        width: 380
      },
      labels: ["Bond", "Stock", "FD", "Mutual Fund", "PPF"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
    this.selectedUserObservable$ = this.userProfileService.selectedUser$;
    this.selectedUserObservable$.subscribe(user => {
      this.selectedUser = user
    })
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { User, UserProfileService } from '../shared/user-profile.service';
import { filter, Observable } from 'rxjs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
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
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'
  ]
})
export class DashboardComponent implements OnInit{
  selectedUserObservable$!: Observable<any>;
  selectedUser!: User;
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions = {
    series: [0, 0 , 0, 0, 0],   // initial data
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

  constructor(public userProfileService: UserProfileService) {
  
  }

  ngOnInit(): void {
    this.selectedUserObservable$ = this.userProfileService.selectedUser$;
    this.selectedUserObservable$
    .pipe(
      filter((user): user is User => user !== null)  // type guard
  )
    .subscribe(user => {
      console.log("user data ", user);
      this.selectedUser = user
    });


    this.chartOptions.series = [
      10,
      10,
      10,
      10,
      60
    ];

    
  }
}

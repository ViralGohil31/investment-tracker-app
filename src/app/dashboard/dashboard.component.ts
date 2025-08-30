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
import { RouterModule } from '@angular/router';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  imports: [NgApexchartsModule, CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'
  ]
})
export class DashboardComponent implements OnInit{
  selectedUserObservable$!: Observable<any>;

  selectedUser!: User;

  @ViewChild("chart") pieChart!: ChartComponent;
  @ViewChild("barChart") barChart!: ChartComponent;

  public pieChartOptions: ChartOptions = {
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

    public barChartOptions: BarChartOptions = {
      series: [
        {
          name: "Invested amount",
          data: [0, 0, 0, 0, 0]   // initial data
        },
        {
          name: 'Interest',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      title: {
        text: "Investment Growth"
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May"]
      },
     yaxis: {
      title: {
        text: "Amount ($)"
      }
    },
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


    this.pieChartOptions.series = [
      10,
      10,
      10,
      10,
      60
    ];

    this.barChartOptions.series =[
        {
          name: "invested amount",
          data: [120000, 200000, 40000, 500000, 100000]   // initial data
        },
         {
          name: 'Interest',
          data: [50000, 85000, 10100, 98000, 87000, 10500]
        }
      ]

    
  }
}

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { Investment, InvestmentService } from '../shared/investment.service';

@Component({
  selector: 'app-investment',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.css'
})
export class InvestmentComponent implements AfterViewInit{
  displayedColumns: string[] = ['assetType', 'doi', 'dom', 'investedAmount', 'rateOfInterest'];
  dataSource = new MatTableDataSource<Investment>();

  totalItems = 0;
  pageSize = 5;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private investmentService: InvestmentService) {}

  ngAfterViewInit() {
    this.loadInvestments(); // initial load
  }

  loadInvestments() {
    this.investmentService.getInvestments(this.pageIndex + 1, this.pageSize).subscribe(res => {
      this.dataSource.data = res.data;
      this.totalItems = res.total;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadInvestments();
  }
}
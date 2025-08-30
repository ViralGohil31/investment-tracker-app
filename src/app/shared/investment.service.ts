import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';

export interface Investment {
  userId: number;
  id: string;
  assetType: string;
  doi: string;
  dom: string;
  investedAmount: string;
  rateOfInterest: string;
}

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  private API_URL = 'https://your-api.com/api/users';

  constructor(private http: HttpClient) {}

  // getInvestments(page: number, limit:number): Observable< {data: Investment[]; total: number}>{
  //   return this.http.get<{data: Investment[]; total: number}>
  //   (`${this.API_URL}?page=${page}&limit=${limit}`);
  // }

  
  getInvestments(page: number, limit:number): Observable< {data: Investment[]; total: number}>{
    const investments: Investment[] = [
      {userId: 1, id: "1", assetType: "Bond", doi: "30-June-2025", dom: "30-June-2026", investedAmount: "1000000", rateOfInterest: "8%" }
    ];
    return of({data: investments, total: 1});
  }

  
}

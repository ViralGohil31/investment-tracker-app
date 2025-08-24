import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvestmentComponent } from './investment/investment.component';

export const routes: Routes = [
    {path: "dashboard", component: DashboardComponent},
    {path: "investment", component: InvestmentComponent}
];

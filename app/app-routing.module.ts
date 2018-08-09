import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContractStreamComponent } from './contract-stream/contract-stream.component';

const routes: Routes = [
  { path: 'detail/:address', component: ContractDetailsComponent },
  { path: 'stream/:address', component: ContractStreamComponent },
  { path: '', component: DashboardComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }

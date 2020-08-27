import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';
import { BigTableModule } from '../../components/big-table/big-table.module';

@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    BigTableModule
  ]
})
export class ReportModule { }

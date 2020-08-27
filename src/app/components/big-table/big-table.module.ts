import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigTableComponent } from './big-table.component';

@NgModule({
  declarations: [BigTableComponent],
  imports: [
    CommonModule,
  ],
  exports: [BigTableComponent]
})
export class BigTableModule { }

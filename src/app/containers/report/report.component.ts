import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { TransportService } from '../../services/transport.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportComponent implements OnInit {

  items$ = this.transportService.getItems();

  constructor(private transportService: TransportService) {
  }

  ngOnInit(): void {
    this.transportService.loadItems();
  }
}

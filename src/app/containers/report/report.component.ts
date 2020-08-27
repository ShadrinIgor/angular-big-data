import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';

import { TransportService } from '../../services/transport.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('itemsContainer', { read: ViewContainerRef }) itemsContainer: ViewContainerRef;
  @ViewChild('rowTemplate', { read: TemplateRef }) rowTemplate: TemplateRef<any>;
  items: any[] = [];
  subs = new Subscription();

  constructor(private transportService: TransportService,
              private cd: ChangeDetectorRef,
              private ngZone: NgZone) {

  }

  ngOnInit(): void {
    this.transportService.loadItems();
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.loadItems();
    });
    this.cd.detach();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Load Items
   */
  loadItems(): void {
    const sub = this.transportService.getItems()
      .subscribe(newItems => {
        const currentLength = this.items.length;
        this.items = [...this.items, ...newItems];
        this.buildView(currentLength, this.items.length);
      });

    this.subs.add(sub);
  }

  /**
   * Build View
   * @param from
   * @param to
   * @private
   */
  private buildView(from: number, to: number): void {
    for (let i = from; i <= to; i++) {
      if (this.items[i]) {
        this.itemsContainer.createEmbeddedView(this.rowTemplate, {
          items: this.items[i]
        });
      }
    }
    this.cd.detectChanges();
  }
}

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { TransportService } from '../../services/transport.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-big-table',
  templateUrl: './big-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BigTableComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() items$: Observable<any>;
  @ViewChild('itemsContainer', { read: ViewContainerRef }) itemsContainer: ViewContainerRef;
  @ViewChild('rowTemplate', { read: TemplateRef }) rowTemplate: TemplateRef<any>;
  items: any[] = [];
  subs = new Subscription();

  constructor(private transportService: TransportService,
              private cd: ChangeDetectorRef,
              private ngZone: NgZone) {
  }

  ngOnInit(): void {
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
    const sub = this.items$
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

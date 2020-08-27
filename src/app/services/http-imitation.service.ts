import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import initData from '../../../data.json';
import { ReportItem } from '../interfaces/report-item';

@Injectable({ providedIn: 'root' })
export class HttpImitationService {

  items = new Subject<ReportItem[]>();
  private templateItem = [
    'new item',
    6658,
    123,
    1.84,
    60,
    48.78,
    36,
    35,
    58.33,
    2,
    2,
    3.33,
    3,
    109.2,
    26.01,
    23.81,
    1.82,
    0.4335,
    54.6
  ];
  perPage = 200;
  countItems = 0;
  totalCount = 1000;
  intervalHandler;

  /**
   * Get
   * @param pathUrl string
   */
  get(pathUrl: string): Observable<ReportItem[]> {
    return this.items.asObservable();
  }

  /**
   * Add Items
   * @private
   */
  loadItems(): void {
    this.items.next(initData.data);
    this.intervalHandler = setInterval( () => this.insertItems(), 0);
  }

  /**
   * Insert Items
   * @private
   */
  private insertItems(): void {
    if (this.countItems <= this.totalCount) {
      const newItems = [];
      for (let i = 0; i < this.perPage; i++) {
        this.countItems ++;
        const newRow = [...this.templateItem];
        newRow[0] = `${newRow[0]}-${this.countItems}`;
        newItems.push(newRow);
      }
      this.items.next(newItems);
    } else {
      clearTimeout(this.intervalHandler);
    }
  }

}

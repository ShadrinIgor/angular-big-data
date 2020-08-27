import { Injectable } from '@angular/core';
import { HttpImitationService } from './http-imitation.service';
import { Observable } from 'rxjs';
import { ReportItem } from '../interfaces/report-item';

@Injectable({ providedIn: 'root' })
export class TransportService {

  constructor(private http: HttpImitationService) {
  }

  /**
   * Get Items
   */
  getItems(): Observable<ReportItem[]> {
    return this.http.get('same-url');
  }

  /**
   * Load Items
   */
  loadItems(): void {
    this.http.loadItems();
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloatingSuccessService {
  private isOpenSubject = new Subject<boolean>();
  isOpen$ = this.isOpenSubject.asObservable();

  openSuccess() {
    this.isOpenSubject.next(true);
  }

  closeSuccess() {
    this.isOpenSubject.next(false);
  }
}
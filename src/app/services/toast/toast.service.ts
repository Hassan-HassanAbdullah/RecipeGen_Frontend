import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Toast {
  type: 'success' | 'error' | 'warning';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new Subject<Toast>();
  toastState$ = this.toastSubject.asObservable();

  showToast(type: 'success' | 'error' | 'warning', message: string): void {
    this.toastSubject.next({ type, message });
  }
  constructor() { }
}

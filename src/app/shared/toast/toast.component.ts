import { Component } from '@angular/core';
import { Toast, ToastService } from '../../services/toast/toast.service';
import { NgClass, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [NgClass, NgIf, NgSwitch, NgSwitchCase],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
   toast: Toast | null = null;
  timeout: any;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toastState$.subscribe((toast: Toast) => {
      this.toast = toast;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.toast = null, 3000); // Auto close after 3s
    });
  }
}

import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  text: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  readonly message = signal<ToastMessage | null>(null);
  private dismissTimer?: number;

  show(text: string, type: ToastMessage['type'] = 'success'): void {
    this.message.set({ text, type });
    window.clearTimeout(this.dismissTimer);
    this.dismissTimer = window.setTimeout(() => this.message.set(null), 3600);
  }

  dismiss(): void {
    window.clearTimeout(this.dismissTimer);
    this.message.set(null);
  }
}

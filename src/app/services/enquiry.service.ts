import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnquiryService {
  private selectedService = '';

  chooseService(service: string): void {
    this.selectedService = service;
  }

  consumeSelectedService(): string {
    const service = this.selectedService;
    this.selectedService = '';
    return service;
  }
}

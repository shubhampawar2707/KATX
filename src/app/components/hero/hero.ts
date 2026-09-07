import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EnquiryService } from '../../services/enquiry.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent {
  pestCategories = [
    { label: 'Termite', service: 'Termite Control' },
    { label: 'Cockroach', service: 'Cockroach Control' },
    { label: 'Rodent', service: 'Rodent Control' },
    { label: 'Mosquito', service: 'Mosquito Control' },
    { label: 'Bed Bug', service: 'Bed Bug Treatment' },
  ];

  constructor(private readonly enquiryService: EnquiryService) {}

  choosePest(service: string): void {
    this.enquiryService.chooseService(service);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

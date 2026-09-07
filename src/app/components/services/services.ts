import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceItem } from '../../models/service.model';
import { EnquiryService } from '../../services/enquiry.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class ServicesComponent {
  constructor(private readonly enquiryService: EnquiryService) {}

  requestEstimate(service: string): void {
    this.enquiryService.chooseService(service);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  serviceGroups: Array<{ title: string; items: ServiceItem[] }> = [
    {
      title: 'Pest Control',
      items: [
        { name: 'Termite Control', description: 'Protect your structure from damaging white ants and hidden termite activity.', category: 'Pest Control', icon: '🪵' },
        { name: 'Cockroach Control', description: 'Targeted treatment for hygienic and long-lasting cockroach elimination.', category: 'Pest Control', icon: '🪲' },
        { name: 'Bed Bug Treatment', description: 'Safe and effective treatment to eliminate bed bugs from bedrooms and mattresses.', category: 'Pest Control', icon: '🛏️' },
        { name: 'Rodent Control', description: 'Professional rodent management to prevent contamination and property damage.', category: 'Pest Control', icon: '🐭' },
        { name: 'Bird Proofing', description: 'Protect rooftops and buildings with humane bird exclusion systems.', category: 'Pest Control', icon: '🐦' },
        { name: 'Termite Inspection', description: 'Detailed inspection to identify risks and recommend effective prevention.', category: 'Pest Control', icon: '🔎' },
      ],
    },
    {
      title: 'Commercial Services',
      items: [
        { name: 'Integrated Pest Management', description: 'Customized IPM programs designed for commercial environments and compliance.', category: 'Commercial Services', icon: '📋' },
        { name: 'Scheduled Servicing', description: 'Routine scheduled care to prevent pest outbreaks in office and industrial spaces.', category: 'Commercial Services', icon: '🗓️' },
        { name: 'Stored Product Pest Control', description: 'Protect warehouses and food facilities from stored product pests and infestations.', category: 'Commercial Services', icon: '📦' },
        { name: 'Rodent & Bird Control', description: 'Holistic control plans to keep facilities clean, safe and compliant.', category: 'Commercial Services', icon: '🏢' },
      ],
    },
    {
      title: 'Hospitals & Hotels',
      items: [
        { name: 'Hospital Pest Management', description: 'Discreet, scheduled pest-control programs designed around patient safety, hygiene, and infection-control routines.', category: 'Healthcare & Hospitality', icon: '🏥' },
        { name: 'Hotel Pest Management', description: 'Protect guest rooms, kitchens, restaurants, and back-of-house areas with responsive hospitality care.', category: 'Healthcare & Hospitality', icon: '🏨' },
        { name: 'Kitchen & Food Area Care', description: 'Targeted protection for kitchens, cafeterias, food stores, and service areas where hygiene matters most.', category: 'Healthcare & Hospitality', icon: '🍽️' },
        { name: 'Preventive Service Plans', description: 'Documented recurring visits that help hospitality and healthcare teams stay prepared and compliant.', category: 'Healthcare & Hospitality', icon: '🗂️' },
      ],
    },
    {
      title: 'Cleaning Services',
      items: [
        { name: 'Deep Cleaning', description: 'Thorough cleaning for residential and commercial properties with lasting freshness.', category: 'Cleaning Services', icon: '🧽' },
        { name: 'Office Cleaning', description: 'Reliable office cleaning keeping your workspace neat, healthy and productive.', category: 'Cleaning Services', icon: '💼' },
        { name: 'Washroom Sanitization', description: 'High-standard sanitization to reduce germs and improve hygiene.', category: 'Cleaning Services', icon: '🚿' },
        { name: 'Carpet & Upholstery Cleaning', description: 'Restore the look and hygiene of soft furnishings with deep care.', category: 'Cleaning Services', icon: '🧶' },
        { name: 'Glass & Window Cleaning', description: 'Crystal-clear windows and glass surfaces for a polished professional finish.', category: 'Cleaning Services', icon: '🪟' },
      ],
    },
  ];
}

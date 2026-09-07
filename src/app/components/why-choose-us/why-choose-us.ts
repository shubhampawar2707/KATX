import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-choose-us.html',
  styleUrl: './why-choose-us.scss',
})
export class WhyChooseUsComponent {
  reasons = [
    { title: 'Professional Experts', description: 'Trained technicians who assess homes, hotels, hospitals, and businesses before recommending treatment.', icon: '✅' },
    { title: 'Safety-led Service', description: 'Careful application with clear preparation and after-care guidance for occupied environments.', icon: '🛡️' },
    { title: 'Affordable Pricing', description: 'Straightforward estimates starting from ₹999 with no confusing packages.', icon: '💸' },
    { title: 'Quick Response', description: 'Fast support for homes, hotels, hospitals, offices, shops, and larger properties.', icon: '⚡' },
    { title: 'Reliable Service', description: 'Scheduled follow-ups and practical prevention advice for ongoing hygiene needs.', icon: '🔒' },
    { title: 'Customer Satisfaction', description: 'A respectful, tidy service experience from enquiry to completion.', icon: '⭐' },
  ];
}

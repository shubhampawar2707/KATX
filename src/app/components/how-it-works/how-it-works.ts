import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.scss',
})
export class HowItWorksComponent {
  steps = [
    { title: 'Book Appointment', description: 'Choose a convenient visit time or call us for quick pest-control support.' },
    { title: 'Select Service', description: 'Tell us whether you need termite, cockroach, rodent, mosquito, or other care.' },
    { title: 'Expert Treatment', description: 'Our technician inspects the space and follows a clear, professional treatment plan suited to homes, hotels, hospitals, or businesses.' },
    { title: 'Relax', description: 'Receive after-care guidance and practical prevention advice for your property.' },
  ];
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent {
  features = [
    { label: 'Professional Team', icon: '👷' },
    { label: 'Safe Solutions', icon: '🛡️' },
    { label: 'Reliable Service', icon: '✅' },
    { label: 'Customer Satisfaction', icon: '⭐' },
  ];
}

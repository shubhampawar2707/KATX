import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero';
import { AboutComponent } from '../../components/about/about';
import { ServicesComponent } from '../../components/services/services';
import { WhyChooseUsComponent } from '../../components/why-choose-us/why-choose-us';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works';
import { ContactComponent } from '../../components/contact/contact';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    WhyChooseUsComponent,
    HowItWorksComponent,
    ContactComponent,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePageComponent {
  faqOpenIndex = 0;

  testimonials = [
    { quote: 'The team arrived on time, explained the treatment clearly, and left our home spotless.', name: 'Meera Joshi', area: 'Warje, Pune' },
    { quote: 'Very responsive service for our office. The scheduled plan has made pest management much easier.', name: 'Rohan Kulkarni', area: 'Baner, Pune' },
    { quote: 'Professional, polite, and transparent about pricing. I would gladly recommend KATX.', name: 'Sanjay Patil', area: 'Wakad, PCMC' },
  ];

  faqs = [
    { question: 'How much does pest control cost?', answer: 'Our services start from ₹999. The final estimate depends on the pest, property size, and treatment required.' },
    { question: 'Are the treatments safe for occupied environments?', answer: 'We use controlled, professional treatments and explain the required safety steps for homes, hotels, hospitals, and workplaces before every service.' },
    { question: 'How quickly can someone visit?', answer: 'We aim to respond the same day across Pune and PCMC, subject to technician availability.' },
    { question: 'Do you provide a service warranty?', answer: 'Warranty and follow-up options depend on the selected treatment. Our team will explain them in your estimate.' },
  ];

  gallery = [
    { image: 'https://images.pexels.com/photos/4176548/pexels-photo-4176548.jpeg?auto=compress&cs=tinysrgb&w=900', label: 'Protective treatment' },
    { image: 'https://images.pexels.com/photos/32055757/pexels-photo-32055757.jpeg?auto=compress&cs=tinysrgb&w=900', label: 'Commercial fumigation' },
    { image: 'https://images.pexels.com/photos/4894608/pexels-photo-4894608.jpeg?auto=compress&cs=tinysrgb&w=900', label: 'Targeted pest prevention' },
  ];

  toggleFaq(index: number): void {
    this.faqOpenIndex = this.faqOpenIndex === index ? -1 : index;
  }
}

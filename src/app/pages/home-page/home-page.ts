import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroComponent } from '../../components/hero/hero';
import { AboutComponent } from '../../components/about/about';
import { ServicesComponent } from '../../components/services/services';
import { WhyChooseUsComponent } from '../../components/why-choose-us/why-choose-us';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works';
import { ContactComponent } from '../../components/contact/contact';
import { Review, ReviewService } from '../../services/review.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
export class HomePageComponent implements OnInit {
  faqOpenIndex = 0;
  reviewSlideIndex = 0;
  reviewVisibleCount = 3;
  isReviewModalOpen = false;
  reviewForm = { name: '', email: '', rating: 5, service: '', area: '', message: '' };
  reviewSubmitting = false;
  reviewSubmitted = false;
  reviewError = '';
  reviewServices = ['Termite Control', 'Cockroach Control', 'Rodent Control', 'Mosquito Control', 'Hospital Pest Management', 'Hotel Pest Management', 'Other'];
  reviewAreas = ['Pune', 'PCMC', 'Mumbai', 'Nashik', 'Raigad', 'Chhatrapati Sambhajinagar', 'Other'];

  testimonials: Review[] = [
    { quote: 'The team arrived on time, explained the treatment clearly, and left our home spotless.', name: 'Meera Joshi', area: 'Warje, Pune', rating: 5 },
    { quote: 'Very responsive service for our office. The scheduled plan has made pest management much easier.', name: 'Rohan Kulkarni', area: 'Baner, Pune', rating: 5 },
    { quote: 'Professional, polite, and transparent about pricing. I would gladly recommend KATX.', name: 'Sanjay Patil', area: 'Wakad, PCMC', rating: 5 },
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

  constructor(
    private readonly reviewService: ReviewService,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.updateReviewVisibleCount();
    this.reviewService.getApprovedReviews()
      .then((reviews) => {
        this.testimonials = [...reviews, ...this.testimonials];
        this.reviewSlideIndex = 0;
      })
      .catch(() => {
        // Keep the built-in testimonials visible if Supabase is unavailable.
      });
  }

  toggleFaq(index: number): void {
    this.faqOpenIndex = this.faqOpenIndex === index ? -1 : index;
  }

  previousReview(): void {
    this.reviewSlideIndex = Math.max(0, this.reviewSlideIndex - 1);
  }

  nextReview(): void {
    this.reviewSlideIndex = Math.min(this.maxReviewSlideIndex, this.reviewSlideIndex + 1);
  }

  selectReview(index: number): void {
    this.reviewSlideIndex = Math.min(index, this.maxReviewSlideIndex);
  }

  get maxReviewSlideIndex(): number {
    return Math.max(0, this.testimonials.length - this.reviewVisibleCount);
  }

  get reviewSlideDots(): number[] {
    return Array.from({ length: this.maxReviewSlideIndex + 1 }, (_, index) => index);
  }

  @HostListener('window:resize')
  updateReviewVisibleCount(): void {
    this.reviewVisibleCount = window.innerWidth <= 760 ? 1 : 3;
    this.reviewSlideIndex = Math.min(this.reviewSlideIndex, this.maxReviewSlideIndex);
  }

  openReviewModal(): void {
    this.reviewError = '';
    this.reviewSubmitted = false;
    this.isReviewModalOpen = true;
  }

  closeReviewModal(): void {
    this.isReviewModalOpen = false;
  }

  setRating(rating: number): void {
    this.reviewForm.rating = rating;
  }

  submitReview(): void {
    if (!this.reviewForm.name || !this.reviewForm.email || !this.reviewForm.service || !this.reviewForm.area || !this.reviewForm.message) {
      this.reviewError = 'Please complete all review fields.';
      return;
    }

    this.reviewSubmitting = true;
    this.reviewError = '';
    this.reviewSubmitted = false;

    const review: Review = {
      quote: this.reviewForm.message,
      name: this.reviewForm.name,
      area: this.reviewForm.area,
      rating: this.reviewForm.rating,
    };

    this.reviewService.addReview({
      ...review,
      email: this.reviewForm.email,
      service: this.reviewForm.service,
    })
      .then(() => {
        this.toastService.show('Your review was submitted successfully for approval.');
        this.reviewForm = { name: '', email: '', rating: 5, service: '', area: '', message: '' };
        this.closeReviewModal();
      })
      .catch((error: Error) => {
        this.reviewError = error.message || 'Unable to submit your review. Please try again.';
      })
      .finally(() => {
        this.reviewSubmitting = false;
      });
  }
}

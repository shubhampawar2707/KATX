import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../services/review.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-reviews-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.scss',
})
export class ReviewsPageComponent {
  reviewForm = { name: '', email: '', rating: 5, service: '', area: '', message: '' };
  reviewSubmitting = false;
  reviewSubmitted = false;
  reviewError = '';

  reviewServices = [
    'Termite Control',
    'Cockroach Control',
    'Rodent Control',
    'Mosquito Control',
    'Hospital Pest Management',
    'Hotel Pest Management',
    'Other',
  ];

  reviewAreas = ['Pune', 'PCMC', 'Mumbai', 'Nashik', 'Raigad', 'Chhatrapati Sambhajinagar', 'Other'];

  constructor(
    private readonly reviewService: ReviewService,
    private readonly toastService: ToastService,
  ) {}

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

    this.reviewService.addReview({
      quote: this.reviewForm.message,
      name: this.reviewForm.name,
      email: this.reviewForm.email,
      area: this.reviewForm.area,
      rating: this.reviewForm.rating,
      service: this.reviewForm.service,
    })
      .then(() => {
        this.toastService.show('Your review was submitted successfully for approval.');
        this.reviewForm = { name: '', email: '', rating: 5, service: '', area: '', message: '' };
      })
      .catch((error: Error) => {
        this.reviewError = error.message || 'Unable to submit your review. Please try again.';
      })
      .finally(() => {
        this.reviewSubmitting = false;
      });
  }
}

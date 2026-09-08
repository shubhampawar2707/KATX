import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface Review {
  id?: string;
  quote: string;
  name: string;
  email?: string;
  area: string;
  rating: number;
  service?: string;
  approved?: boolean;
  created_at?: string;
}

interface SupabaseReviewRow {
  id: string;
  name: string;
  rating: number;
  service: string;
  area: string;
  message: string;
  approved: boolean;
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  async getApprovedReviews(): Promise<Review[]> {
    const response = await fetch(this.getReviewsUrl(), {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(await this.getError(response));
    }

    const data = await response.json() as SupabaseReviewRow[];
    return data.map((review) => ({
      id: review.id,
      quote: review.message,
      name: review.name,
      area: review.area,
      rating: review.rating,
      service: review.service,
      approved: review.approved,
      created_at: review.created_at,
    }));
  }

  async addReview(review: Review): Promise<void> {
    const response = await fetch(this.getReviewsEndpoint(), {
      method: 'POST',
      headers: {
        ...this.getHeaders(),
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        name: review.name,
        email: review.email,
        rating: review.rating,
        service: review.service,
        area: review.area,
        message: review.quote,
        approved: false,
      }),
    });

    if (!response.ok) {
      throw new Error(await this.getError(response));
    }
  }

  private getReviewsUrl(): string {
    return `${this.getReviewsEndpoint()}?select=id%2Cname%2Crating%2Cservice%2Carea%2Cmessage%2Capproved%2Ccreated_at&approved=eq.true&order=created_at.desc`;
  }

  private getReviewsEndpoint(): string {
    return `${environment.supabase.url}/rest/v1/reviews`;
  }

  private getHeaders(): HeadersInit {
    return {
      apikey: environment.supabase.publishableKey,
      Authorization: `Bearer ${environment.supabase.publishableKey}`,
      'Content-Type': 'application/json',
    };
  }

  private async getError(response: Response): Promise<string> {
    try {
      const body = await response.json() as { message?: string; error?: string };
      return body.message || body.error || `Supabase request failed (${response.status}).`;
    } catch {
      return `Supabase request failed (${response.status}).`;
    }
  }
}

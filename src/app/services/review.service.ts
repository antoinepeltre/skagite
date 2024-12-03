import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private supabaseService: SupabaseService) { }

  async fetchReviews(): Promise<Review[]> {
    const { data, error } = await this.supabaseService.client
      .from('reviews')
      .select('*');
  
    if (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  
    return data ? data.map(review => new Review(review)) : [];
  }
}

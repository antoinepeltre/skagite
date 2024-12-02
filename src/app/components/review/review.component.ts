import { Component, OnInit } from '@angular/core';
import { Review } from '../../models/Review';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent implements OnInit{
  reviews: Review[] = [];


  constructor(private reviewService: ReviewService) {

  }

  ngOnInit() {
    this.fetchReviews();

  }

  async fetchReviews() {
    try {
      this.reviews = await this.reviewService.fetchReviews();
    } catch (error) {
      console.error('Failed to load rooms:', error);
    }
  }

}

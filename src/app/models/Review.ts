export class Review {
    id: number;
    rating: number;
    reviewer_name: string;
    comment: string;
    created_at: string;
  
    constructor(data: any) {
      this.id = data.id;
      this.rating = data.rating;
      this.reviewer_name = data.reviewer_name;
      this.comment = data.comment;
      this.created_at = data.created_at;
    }
  
  
    // Getter et Setter pour 'reviewer_name'
    get reviewerName(): string {
      return this.reviewer_name;
    }
  
    set reviewerName(value: string) {
      this.reviewer_name = value;
    }
  
  
    // Getter et Setter pour 'created_at'
    get createdAt(): string {
      return this.created_at;
    }
  
    set createdAt(value: string) {
      this.created_at = value;
    }
  }
  
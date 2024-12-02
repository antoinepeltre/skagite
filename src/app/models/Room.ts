export class Room {
    id: number;
    name: string;
    description: string;
    price_weekday: number;
    price_weekend: number;
    capacity_adults: number;
    capacity_children: number;
    crib_price: number;
    image_url: string;
    cover_url: string;
    picture_urls: string[];
  
    constructor(data: any) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
      this.price_weekday = data.price_weekday;
      this.price_weekend = data.price_weekend;
      this.capacity_adults = data.capacity_adults;
      this.capacity_children = data.capacity_children;
      this.crib_price = data.crib_price;
      this.image_url = data.image_url;
      this.cover_url = data.cover_url;
      this.picture_urls = data.picture_urls || [];
    }
  
    get imageUrl(): string {
      return this.image_url;
    }
  
    set imageUrl(value: string) {
      this.image_url = value;
    }
  
    get priceWeekend(): number {
      return this.price_weekend;
    }
  
    set priceWeekend(value: number) {
      this.price_weekend = value;
    }
  
    get priceWeekday(): number {
      return this.price_weekday;
    }
  
    set priceWeekday(value: number) {
      this.price_weekday = value;
    }
  
    get capacityAdults(): number {
      return this.capacity_adults;
    }
  
    set capacityAdults(value: number) {
      this.capacity_adults = value;
    }
  
    get capacityChildren(): number {
      return this.capacity_children;
    }
  
    set capacityChildren(value: number) {
      this.capacity_children = value;
    }
  
    get cribPrice(): number {
      return this.crib_price;
    }
  
    set cribPrice(value: number) {
      this.crib_price = value;
    }
  
    get coverUrl(): string {
      return this.cover_url;
    }
  
    set coverUrl(value: string) {
      this.cover_url = value;
    }
  
    get pictureUrls(): string[] {
      return this.picture_urls;
    }
  
    set pictureUrls(value: string[]) {
      this.picture_urls = value;
    }
  }
  
export class Reservation {
  private room_id: number;
  private start_date: string;
  private end_date: string;
  private guests: number;
  private baby_cot: boolean;
  private total_price: number;
  private status: 'pending' | 'confirmed' | 'cancelled';
  private created_at: string;
  private updated_at: string;

  constructor(data: any) {
    this.room_id = data.room_id;
    this.start_date = data.start_date;
    this.end_date = data.end_date;
    this.guests = data.guests;
    this.baby_cot = data.baby_cot;
    this.total_price = data.total_price;
    this.status = data.status || 'pending';
    this.created_at = data.created_at || new Date().toISOString();
    this.updated_at = data.updated_at || new Date().toISOString();
  }

  get roomId(): number {
    return this.room_id;
  }

  set roomId(value: number) {
    this.room_id = value;
  }

  get startDate(): string {
    return this.start_date;
  }

  set startDate(value: string) {
    this.start_date = value;
  }


  get endDate(): string {
    return this.end_date;
  }

  set endDate(value: string) {
    this.end_date = value;
  }

  get babyCot(): boolean {
    return this.baby_cot;
  }

  set babyCot(value: boolean) {
    this.baby_cot = value;
  }

  get totalPrice(): number {
    return this.total_price;
  }

  set totalPrice(value: number) {
    this.total_price = value;
  }

  get createdAt(): string {
    return this.created_at;
  }

  set createdAt(value: string) {
    this.created_at = value;
  }

  get updatedAt(): string {
    return this.updated_at;
  }

  set updatedAt(value: string) {
    this.updated_at = value;
  }
}

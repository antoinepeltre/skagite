import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from '../../models/Room';
import { ReservationService } from '../../services/reservation.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FeedbackMessage } from '../../models/FeedbackMessage';
import { Reservation } from '../../models/Reservation';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CalendarModule,
    FormsModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  reservationForm!: FormGroup;
  @Input() rooms: Room[] = [];
  @Input() room: Room | undefined;
  totalPrice = 0;
  isLoading = false;
  feedbackMessage: FeedbackMessage | null = null;

  selectedDate: Date | null = null;
  startDate: string = '';
  endDate: string = '';
  reservedDates: Date[] = [];
  disabledDates: Date[] = [];
  selectedDates: Date[] = [];

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.setupFormSubscriptions();
    this.initializeRoomSelection();
  }

  initializeForm(): void {
    this.reservationForm = this.fb.group({
      room: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      adults: [1, [Validators.required, Validators.min(1), Validators.max(2)]],
      children: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      crib: [false]
    });
  }

  setupFormSubscriptions(): void {
    this.reservationForm.valueChanges.subscribe(() => {
      this.updateTotalPrice();
    });
  }

  initializeRoomSelection(): void {
    // Automatically select the first room if none is selected
    if (this.rooms && this.rooms.length > 0 && !this.room) {
      this.selectRoom(this.rooms[0].id);
    }

    if (this.room) {
      this.selectRoom(this.room.id);
    }
  }

  selectRoom(roomId: number): void {
    // Patch the form with the selected room ID and load its reserved dates
    this.reservationForm.patchValue({ room: roomId });
    this.loadReservedDates(roomId);
  }

  loadReservedDates(roomId: number): void {
    // Fetch reserved dates for the selected room and disable those dates on the calendar
    this.isLoading = true;
    this.reservationService.getReservedDates(roomId).then(dates => {
      this.disabledDates = dates.map(dateString => {
        const date = new Date(dateString);
        date.setHours(0, 0, 0, 0);
        return date;
      });
      this.isLoading = false;
    });
  }

  onRoomChange(event: any): void {
    const roomId = event.target.value;
    this.loadReservedDates(roomId);
  }

  onDateChange(): void {
    if (this.selectedDates.length === 2) {
      const [start, end] = this.selectedDates;

      if (this.isInvalidDateRange(start, end)) {
        this.showMessage({ type: 'error', text: "Réservation impossible : le gîte est fermé le lundi." });
        this.resetDates();
        return;
      }

      this.checkDateAvailability(start, end);
    }
  }

  checkDateAvailability(start: Date, end: Date): void {
    const roomId = this.reservationForm.value.room;
    if (roomId && start && end) {
      this.reservationService.checkAvailability(roomId, start.toISOString(), end.toISOString())
        .then(isAvailable => {
          if (!isAvailable) {
            this.showMessage({ type: 'error', text: 'Certaines des dates sélectionnées sont déjà réservées.' });
            this.resetDates();
          } else {
            this.updateFormDates(start, end);
          }
        })
        .catch(() => {
          this.showMessage({ type: 'error', text: 'Une erreur est survenue lors de la vérification de la disponibilité. Veuillez réessayer.' });
          this.resetDates();
        });
    }
  }

  updateFormDates(start: Date, end: Date): void {
    this.startDate = this.adjustDateForTimezone(start);
    this.endDate = this.adjustDateForTimezone(end);
    this.reservationForm.patchValue({ startDate: this.startDate, endDate: this.endDate });
  }

  adjustDateForTimezone(date: Date): string {
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return localDate.toISOString().split('T')[0];
  }

  isInvalidDateRange(start: Date, end: Date): boolean {
    const currentDate = new Date(start);
    while (currentDate <= end) {
      if (currentDate.getDay() === 1) { // Check if it's a Monday
        return true;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return false;
  }

  getDateCellClass(date: any): string {
    const currentDate = new Date(date.year, date.month, date.day);

    if (this.isReservedDay(currentDate)) {
      return 'reserved-day';
    }

    if (this.isNonBookableDay(currentDate)) {
      return 'non-bookable-day';
    }

    return '';
  }

  isReservedDay(date: Date): boolean {
    return this.disabledDates.some(d => d.getTime() === date.getTime());
  }

  isNonBookableDay(date: Date): boolean {
    return date.getDay() === 1; // Every Monday
  }

  updateTotalPrice(): void {
    const { startDate, endDate, crib } = this.reservationForm.value;
    if (startDate && endDate) {
      this.reservationService.calculatePrice(startDate, endDate, crib).then(price => {
        this.totalPrice = price;
      });
    }
  }

  async onSubmit(): Promise<void> {
    if (this.reservationForm.valid) {
      const formValues = this.reservationForm.value;
      const reservation = new Reservation({
        room_id: formValues.room,
        start_date: formValues.startDate,
        end_date: formValues.endDate,
        guests: formValues.adults + formValues.children,
        baby_cot: formValues.crib,
        total_price: this.totalPrice,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      this.isLoading = true;

      try {
        // Check if the selected dates are still available before making the reservation
        const isAvailable = await this.reservationService.checkAvailability(reservation.roomId, reservation.startDate, reservation.endDate);
        if (isAvailable) {
          await this.reservationService.addReservation(reservation);
          this.showMessage({ type: 'success', text: "L'équipe Skagite vous remercie pour votre réservation et reviendra vers vous très prochainement !" });
          this.loadReservedDates(reservation.roomId);
          this.resetForm(reservation.roomId);
        } else {
          this.showMessage({ type: 'error', text: 'La chambre est indisponible pour les dates sélectionnées.' });
        }
      } catch {
        this.showMessage({ type: 'error', text: 'Une erreur s\'est produite lors du traitement de votre réservation. Veuillez réessayer.' });
      } finally {
        this.isLoading = false;
      }
    }
  }

  resetForm(roomId: number): void {
    // Reset the form with initial values and clear the related states
    this.reservationForm.reset({
      room: roomId,
      startDate: '',
      endDate: '',
      adults: 1,
      children: 0,
      crib: false,
    });
    this.startDate = '';
    this.endDate = '';
    this.totalPrice = 0;
  }

  showMessage(message: FeedbackMessage): void {
    this.feedbackMessage = message;
    setTimeout(() => {
      this.feedbackMessage = null;
    }, 5000);
  }

  resetDates(): void {
    this.selectedDates = [];
    this.startDate = '';
    this.endDate = '';
    this.reservationForm.patchValue({ startDate: '', endDate: '' });
  }
}

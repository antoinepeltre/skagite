import { Component, ChangeDetectorRef } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/Room';
import { ReservationService } from '../../services/reservation.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Reservation } from '../../models/Reservation';
import { BehaviorSubject, distinctUntilChanged, Subscription } from 'rxjs';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
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
  rooms: Room[] = [];
  totalPrice = 0;
  isLoading = false;
  errorMessage: string | null = null;

  selectedDate: Date | null = null;
  startDate: string = '';
  endDate: string = '';
  reservedDates: Date[] = [];
  disabledDates: Date[] = [];

  date: Date | undefined;
  selectedDates: Date[] = [];

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private reservationService: ReservationService,
    private cdr: ChangeDetectorRef
  ) { }

  // Initialisation du formulaire et chargement des chambres disponibles
  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      room: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      adults: [1, [Validators.required, Validators.min(1), Validators.max(2)]],
      children: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      crib: [false]
    });

    this.date = new Date();
    this.loadRooms();

    // Calcul du prix total à chaque changement de valeur dans le formulaire
    this.reservationForm.valueChanges.subscribe(() => {
      this.calculateTotalPrice();
    });
  }

  // Charge les chambres disponibles et sélectionne la première chambre
  async loadRooms(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = null;
    try {
      this.rooms = await this.roomService.fetchRooms();
      if (this.rooms) {
        this.reservationForm.patchValue({
          room: this.rooms[0].id
        });
        this.loadReservedDates(this.rooms[0].id);
      }
    } catch (error) {
      this.errorMessage = 'Failed to load rooms. Please try again later.';
    } finally {
      this.isLoading = false;
    }
  }

  // Charge les dates réservées pour une chambre donnée
  loadReservedDates(roomId: number): void {
    this.reservationService.getReservedDates(roomId).then(dates => {
      const reservedAndUnavailableDates = [
        ...dates,
      ];

      // Mise à jour de la liste des dates désactivées
      this.disabledDates = reservedAndUnavailableDates.map(dateString => {
        const date = new Date(dateString);
        date.setHours(0, 0, 0, 0);
        return date;
      });
    });
  }


  // Gère le changement de chambre sélectionnée
  onRoomChange(event: any): void {
    const roomId = event.target.value;
    this.loadReservedDates(roomId);
  }

  // Gère le changement de dates sélectionnées
  onDateChange(event: any): void {
    if (this.selectedDates && this.selectedDates.length === 2) {
      const [start, end] = this.selectedDates;

      if (start && end) {
        const hasMonday = this.isDateRangeInvalid(start, end);

        if (hasMonday) {
          alert('Réservation impossible : le gîte est fermé le lundi.');
          // Réinitialise les dates sélectionnées si le range inclut un lundi
          this.reservationForm.patchValue({
            startDate: '',
            endDate: ''
          });
          this.selectedDates = [];
          this.date = undefined;
          return;
        }

        this.startDate = this.adjustDateForTimezone(start);
        this.endDate = this.adjustDateForTimezone(end);

        this.reservationForm.patchValue({
          startDate: this.startDate,
          endDate: this.endDate
        });
      }
    }
  }

  // Ajuste les dates en fonction du fuseau horaire local
  adjustDateForTimezone(date: Date): string {
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return localDate.toISOString().split('T')[0];
  }

  // Vérifie si une plage de dates est invalide (si elle contient un lundi)
  isDateRangeInvalid(start: Date, end: Date): boolean {
    const currentDate = new Date(start);
    while (currentDate <= end) {
      if (currentDate.getDay() === 1) { // Vérifie si c'est un lundi
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
    return date.getDay() === 1; // Tous les lundis
  }



  // Calcule le prix total en fonction des dates sélectionnées et des options
  calculateTotalPrice(): void {
    const { startDate, endDate, crib } = this.reservationForm.value;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));

      const weekendPrice = 7000;
      const weekdayPrice = 5000;
      const cribPrice = crib ? 1000 : 0;

      let price = diff * weekdayPrice + cribPrice;
      for (let i = 0; i < diff; i++) {
        const day = new Date(start);
        day.setDate(day.getDate() + i);
        if (day.getDay() === 0 || day.getDay() === 6) {
          price += (weekendPrice - weekdayPrice);
        }
      }

      this.totalPrice = price;
    }
  }

  // Soumet le formulaire de réservation
  async onSubmit(): Promise<void> {
    if (this.reservationForm.valid) {
      const formValues = this.reservationForm.value;
      const { startDate, endDate, room, adults, children, crib } = formValues;

      const reservation = new Reservation({
        room_id: room,
        start_date: startDate,
        end_date: endDate,
        guests: adults + children,
        baby_cot: crib,
        total_price: this.totalPrice,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      this.isLoading = true;
      this.errorMessage = null;
      try {
        const isAvailable = await this.reservationService.checkAvailability(reservation.roomId, reservation.startDate, reservation.endDate);
        if (isAvailable) {
          await this.reservationService.addReservation(reservation);
          alert('Réservation réussie !');

          this.loadReservedDates(reservation.roomId);

          this.reservationForm.reset({
            room: '',
            startDate: '',
            endDate: '',
            adults: 1,
            children: 0,
            crib: false
          });
          this.date = undefined;
          this.startDate = '';
          this.endDate = '';
        } else {
          alert('La chambre est indisponible pour les dates sélectionnées.');
        }
      } catch (error) {
        this.errorMessage = 'An error occurred while processing your reservation. Please try again.';
      } finally {
        this.isLoading = false;
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private weekdayPrice = 5000; // Tarif en semaine
  private weekendPrice = 7000; // Tarif le week-end
  private cribPrice = 1000; // Supplément pour lit parapluie


  constructor(private supabaseService: SupabaseService) { }

  async checkAvailability(roomId: number, startDate: string, endDate: string): Promise<boolean> {
    const adjustedStartDate = new Date(startDate);
    adjustedStartDate.setHours(adjustedStartDate.getHours() + 1);

    const adjustedEndDate = new Date(endDate);
    adjustedEndDate.setHours(adjustedEndDate.getHours() + 1);
    
    try {
      const { data, error } = await this.supabaseService.client
        .from('reservations')
        .select('*')
        .eq('room_id', roomId)
        .lte('start_date', adjustedEndDate.toISOString()) 
        .gte('end_date', adjustedStartDate.toISOString());
  
      if (error) {
        throw error;
      }
  
      // Si des réservations existent qui chevauchent les dates proposées, la chambre est occupée
      return data.length === 0; // Pas de réservation chevauchante => chambre disponible
    } catch (error) {
      console.error('Error checking availability:', error);
      return false;
    }
  }
  
  async addReservation(reservation: any): Promise<void> {
    const { error } = await this.supabaseService
      .client
      .from('reservations')
      .insert([reservation]);

    if (error) {
      console.error('Error adding reservation:', error);
      throw error;
    }
  }

  async getReservedDates(roomId: number): Promise<Date[]> {
    try {
      const { data, error } = await this.supabaseService.client
        .from('reservations')
        .select('*')
        .eq('room_id', roomId);

      if (error) {
        throw error;
      }

      // Convert reservations into reserved dates
      const reservedDates: Date[] = data.map((reservation: any) => {
        const startDate = new Date(reservation.start_date);
        const endDate = new Date(reservation.end_date);
        let dates = [];
        
        // Fill the table with all dates between startDate and endDate
        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
          dates.push(new Date(date)); // Add each reserved date to the table
        }
        
        return dates;
      }).flat();

      return reservedDates;
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations:', error);
      return []; 
    }
  }

  async calculatePrice(startDate: string, endDate: string, crib: boolean): Promise<number> {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check validity of dates
    const timeDiff = end.getTime() - start.getTime();
    const numberOfNights = timeDiff / (1000 * 3600 * 24);

    if (numberOfNights < 1) {
      throw new Error('La durée de la réservation doit être d\'au moins 1 nuit.');
    }

    // Check that the reservation does not cover a Monday
    if (this.isDateInRange(start, end, 1)) {
      throw new Error('Le gîte est fermé le lundi. Veuillez choisir d\'autres dates.');
    }

    let totalPrice = 0;

    // Price calculation for each night
    for (let i = 0; i < numberOfNights; i++) {
      const currentDay = new Date(start);
      currentDay.setDate(currentDay.getDate() + i);

      // Check if it's a weekend (Saturday or Sunday)
      if (currentDay.getDay() === 0 || currentDay.getDay() === 6) {
        totalPrice += this.weekendPrice;
      } else {
        totalPrice += this.weekdayPrice;
      }
    }

    // Add supplement for umbrella bed, if selected
    if (crib) {
      totalPrice += this.cribPrice;
    }

    return totalPrice;
  }

  private isDateInRange(start: Date, end: Date, targetDay: number): boolean {
    const currentDate = new Date(start);
    while (currentDate <= end) {
      if (currentDate.getDay() === targetDay) {
        return true; // Monday found in date range
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return false;
  }
  
}

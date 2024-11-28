import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Reservation } from '../models/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private supabaseService: SupabaseService) { }

  async checkAvailability(roomId: number, startDate: string, endDate: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabaseService.client
        .from('reservations')
        .select('*')
        .eq('room_id', roomId)
        .lte('start_date', endDate) // Date de début de la réservation existante doit être avant ou égale à la fin de la nouvelle réservation
        .gte('end_date', startDate); // Date de fin de la réservation existante doit être après ou égale au début de la nouvelle réservation
  
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
      // Récupérer les réservations de la chambre
      const { data, error } = await this.supabaseService.client
        .from('reservations') // Nom de la table dans ta base de données
        .select('*') // Sélectionner toutes les colonnes
        .eq('room_id', roomId); // Filtrer par room_id

      if (error) {
        throw error;
      }

      // Transformer les réservations en dates réservées
      const reservedDates: Date[] = data.map((reservation: any) => {
        const startDate = new Date(reservation.start_date);
        const endDate = new Date(reservation.end_date);
        let dates = [];
        
        // Remplir le tableau avec toutes les dates entre startDate et endDate
        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
          dates.push(new Date(date)); // Ajouter chaque date réservée au tableau
        }
        
        return dates;
      }).flat();

      return reservedDates;
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations:', error);
      return []; // Retourner un tableau vide en cas d'erreur
    }
  }

  
}

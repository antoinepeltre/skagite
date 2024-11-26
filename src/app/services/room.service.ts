// src/app/services/rooms.service.ts

import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Room } from '../models/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private supabaseService: SupabaseService) { }

  async getRooms(): Promise<Room[]> {
    const { data, error } = await this.supabaseService.client
      .from('rooms')
      .select('*');
  
    if (error) {
      console.error('Error fetching rooms:', error);
      throw error;  // Lancer l'erreur si problème
    }
  
    return data ? data.map(room => new Room(room)) : [];
  }
}

// src/app/services/rooms.service.ts

import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Room } from '../models/room.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomsSubject = new BehaviorSubject<Room[] | null>(null);
  rooms$ = this.roomsSubject.asObservable();

  constructor(private supabaseService: SupabaseService) { }

  async fetchRooms(): Promise<void> {
    try {
      const { data, error } = await this.supabaseService.client
        .from('rooms')
        .select('*');

      if (error) {
        console.error('Error fetching rooms:', error);
        throw error;
      }

      const rooms = data ? data.map((room) => new Room(room)) : [];
      this.roomsSubject.next(rooms);
    } catch (error) {
      this.roomsSubject.next([]);
      throw error;
    }
  }


  async fetchRoom(roomId: string): Promise<Room> {
    const { data, error } = await this.supabaseService.client
      .from('rooms')
      .select('*')
      .eq('id', roomId)
      .single();
  
    if (error) {
      console.error('Error fetching room:', error);
      throw error;
    }
    
    return new Room(data);
  }


}

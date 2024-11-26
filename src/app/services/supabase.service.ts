import { environment } from './../../environments/environment.development';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
    private supabaseUrl = environment.supabaseUrl;
    private supabaseKey = environment.supabaseKey;
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  
  async getData(table: string) {
    const { data, error } = await this.supabase
      .from(table)
      .select('*');
    if (error) {
      throw error;
    }
    return data;
  }
}

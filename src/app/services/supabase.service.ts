
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabaseUrl = environment.SUPABASE_URL;
  private supabaseKey = environment.SUPABASE_KEY;
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  get client(): SupabaseClient {
    return this.supabase;
  }



}

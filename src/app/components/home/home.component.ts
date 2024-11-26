import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ReservationComponent } from "../reservation/reservation.component";
import { FooterComponent } from "../footer/footer.component";
import { SupabaseService } from '../../services/supabase.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [HeaderComponent, ReservationComponent, FooterComponent]
})
export class HomeComponent implements OnInit{
  data: any;

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.getData();
  }


  async getData() {
    try {
      this.data = await this.supabaseService.getData('your-table-name');
    } catch (error) {
      console.error('Error fetching data from Supabase:', error);
    }
  }

}

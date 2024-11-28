import { HeroSectionComponent } from "../hero-section/hero-section.component";
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ReservationComponent } from "../reservation/reservation.component";
import { FooterComponent } from "../footer/footer.component";
import { Room } from '../../models/Room';
import { RoomService } from '../../services/room.service';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [HeroSectionComponent, HeaderComponent, ReservationComponent, FooterComponent, CommonModule]
})
export class HomeComponent implements OnInit {
  rooms: Room[] = [];


  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.getRooms();

  }

  async getRooms() {
    try {
      this.rooms = await this.roomService.getRooms();
    } catch (error) {
      console.error('Failed to load rooms:', error);
    }
  }




}

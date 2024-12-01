import { HeroSectionComponent } from "../hero-section/hero-section.component";
import { ReviewComponent } from "../review/review.component";
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ReservationComponent } from "../reservation/reservation.component";
import { FooterComponent } from "../footer/footer.component";
import { Room } from '../../models/Room';
import { RoomService } from '../../services/room.service';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";



@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [HeroSectionComponent,ReviewComponent, HeaderComponent, ReservationComponent, FooterComponent, CommonModule, ]
})
export class HomeComponent implements OnInit {
  rooms: Room[] = [];


  constructor(private roomService: RoomService,
    private router: Router) { }

  ngOnInit() {
    this.fetchRooms();

  }

  async fetchRooms() {
    try {
      this.rooms = await this.roomService.fetchRooms();
    } catch (error) {
      console.error('Failed to load rooms:', error);
    }
  }

  navigateToRoomDetail(roomId: number) {
    this.router.navigate(['/rooms/', roomId]);
  }




}

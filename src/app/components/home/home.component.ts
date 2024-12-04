import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { Room } from '../../models/room.model';
import { RoomService } from '../../services/room.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReviewComponent } from "../review/review.component";
import { ReservationComponent } from "../reservation/reservation.component";
import { HeroSectionComponent } from "../hero-section/hero-section.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [HeaderComponent, FooterComponent, CommonModule, ReviewComponent, ReservationComponent, HeroSectionComponent]
})
export class HomeComponent implements OnInit {
  rooms: Room[] = [];


  constructor(private roomService: RoomService,
    private router: Router) { }

  ngOnInit() {
    this.roomService.rooms$.subscribe((data) => {
      if (data) this.rooms = data;
    });

  }

  navigateToRoomDetail(roomId: number) {
    this.router.navigate(['/room/', roomId]);
  }
}

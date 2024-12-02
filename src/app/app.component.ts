import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { Room } from './models/Room';
import { RoomService } from './services/room.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent]
})
export class AppComponent implements OnInit {
  title = 'skagite';
  rooms: Room[] = [];


  constructor(private roomService: RoomService) {

  }

  ngOnInit() {
    this.roomService.fetchRooms().catch((error) => {
      console.error('Error fetching rooms in AppComponent:', error);
    });

    // Subscribe to the rooms observable to get updates
    this.roomService.rooms$.subscribe((data) => {
      if (data) this.rooms = data;
    });

  }
}

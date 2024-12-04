import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { Room } from '../../models/room.model';
import { RoomService } from '../../services/room.service';

@Component({
    selector: 'app-layout',
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
    imports: [RouterOutlet, HeaderComponent, FooterComponent]
})
export class LayoutComponent {
  rooms: Room[] = [];


  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.roomService.fetchRooms().catch((error) => {
      console.error('Error fetching rooms in AppComponent:', error);
    });

    this.roomService.rooms$.subscribe((data) => {
      if (data) this.rooms = data;
    });

  }

}

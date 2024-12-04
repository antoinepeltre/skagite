import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ReservationComponent } from "../reservation/reservation.component";
import { Room } from '../../models/room.model';
import { RoomService } from '../../services/room.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-room-detail',
    standalone: true,
    templateUrl: './room-detail.component.html',
    styleUrl: './room-detail.component.scss',
    imports: [ReservationComponent, HeaderComponent, FooterComponent, CommonModule]
})
export class RoomDetailComponent implements OnInit {

    room: Room | undefined;
    loading: boolean = false;
    error: any;


    constructor(private roomService: RoomService,
        private route: ActivatedRoute) {


    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const roomId = params.get('id');
            if (roomId) {
              this.fetchRoom(roomId);
            }
          });

    }

    async fetchRoom(roomId: string) {
        this.loading = true;
        this.error = null;

        try {
            this.room = await this.roomService.fetchRoom(roomId);
        } catch (error) {
            this.error = error;
            console.error('Failed to fetch room:', error);
        } finally {
            this.loading = false;
        }
    }

}

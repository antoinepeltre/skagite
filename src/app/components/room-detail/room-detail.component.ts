import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ReservationComponent } from "../reservation/reservation.component";

@Component({
    selector: 'app-room-detail',
    standalone: true,
    templateUrl: './room-detail.component.html',
    styleUrl: './room-detail.component.scss',
    imports: [ReservationComponent, HeaderComponent, FooterComponent]
})
export class RoomDetailComponent {

}

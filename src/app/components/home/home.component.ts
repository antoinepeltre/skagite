import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ReservationComponent } from "../reservation/reservation.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [HeaderComponent, ReservationComponent]
})
export class HomeComponent {

}

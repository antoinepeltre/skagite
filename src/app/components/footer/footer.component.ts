import { Component, Input } from '@angular/core';
import { Room } from '../../models/room.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() rooms: Room[] = [];

}

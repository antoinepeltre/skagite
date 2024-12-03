import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '../../models/room.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() rooms: Room[] = [];
  isMenuOpen = false;

  constructor(private router: Router) {

  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }


  navigateToHome() {
    this.router.navigate(['/']);
  }

}

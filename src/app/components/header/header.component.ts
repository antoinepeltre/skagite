import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '../../models/Room';
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

  constructor(private router: Router) {

  }


  navigateToHome() {
    this.router.navigate(['/']);
  }

}

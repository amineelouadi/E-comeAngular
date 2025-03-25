import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  itemCount = computed(() => this.cartService.getItemCount());
  isMenuOpen = false; 

  constructor(private cartService: CartService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CartState } from '../../models/cart.type';
import { CartItem } from '../../models/cart.type';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  private cartService = inject(CartService);

  // Create computed signals for the cart state properties
  protected items = computed(() => this.cartService.getCartState()().items);
  protected subtotal = computed(() => this.cartService.getCartState()().subtotal);
  protected tax = computed(() => this.cartService.getCartState()().tax);
  protected total = computed(() => this.cartService.getCartState()().total);

  updateQuantity(productId: number, quantity: number) {
    if (quantity >= 1) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  onQuantityChange(event: Event, productId: number) {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value, 10);
    this.updateQuantity(productId, quantity);
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  trackById(index: number, item: CartItem): number {
    return item.product.id;
  }
}

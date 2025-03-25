import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.type';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  toggleWishlist() {
    if (this.isInWishlist()) {
      this.wishlistService.removeFromWishlist(this.product);
    } else {
      this.wishlistService.addToWishlist(this.product);
    }
  }

  isInWishlist(): boolean {
    return this.wishlistService.wishlist().some(item => item.id === this.product.id);
  }
}
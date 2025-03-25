import { Component } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.type';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent {
  // Access the signal directly from the service
  wishlist = this.wishlistService.wishlist;

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private router: Router
  ) {}

  removeFromWishlist(product: Product) {
    this.wishlistService.removeFromWishlist(product);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.removeFromWishlist(product);
  }

  redirectToProducts() {
    this.router.navigate(['/products']);
  }
}
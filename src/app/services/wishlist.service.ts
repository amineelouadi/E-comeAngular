import { Injectable } from '@angular/core';
import { Product } from '../models/product.type';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: Product[] = [];

  addToWishlist(product: Product): void {
    if (!this.isInWishlist(product)) {
      this.wishlist.push(product);
    }
  }

  removeFromWishlist(product: Product): void {
    this.wishlist = this.wishlist.filter(item => item.id !== product.id);
  }

  isInWishlist(product: Product): boolean {
    return this.wishlist.some(item => item.id === product.id);
  }

  getWishlist(): Product[] {
    return this.wishlist;
  }

  getWishlistCount(): number {
    return this.wishlist.length;
  }
}

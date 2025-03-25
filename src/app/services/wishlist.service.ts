import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.type';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistKey = 'wishlist';
  private _wishlist = signal<Product[]>([]);
  public wishlist = this._wishlist.asReadonly();
  public wishlistCount = computed(() => this._wishlist().length);

  constructor() {
    this.loadWishlist();
  }

  private loadWishlist() {
    const storedWishlist = localStorage.getItem(this.wishlistKey);
    if (storedWishlist) {
      this._wishlist.set(JSON.parse(storedWishlist));
    }
  }

  addToWishlist(product: Product) {
    this._wishlist.update(items => {
      if (!items.some(item => item.id === product.id)) {
        return [...items, product];
      }
      return items;
    });
    this.saveWishlist();
  }

  removeFromWishlist(product: Product) {
    this._wishlist.update(items => items.filter(item => item.id !== product.id));
    this.saveWishlist();
  }

  private saveWishlist() {
    localStorage.setItem(this.wishlistKey, JSON.stringify(this._wishlist()));
  }
}
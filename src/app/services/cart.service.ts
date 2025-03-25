import { Injectable, computed, signal } from '@angular/core';
import { CartItem, CartState } from '../models/cart.type';
import { Product } from '../models/product.type';

const TAX_RATE = 0.08;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly cartState = signal<CartState>({
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0
  });

  constructor() {
    this.loadFromLocalStorage();
  }

  private calculateTotals(items: CartItem[]): CartState {
    const subtotal = items.reduce((total, item) => {
      const price = item.product.discountPrice ?? item.product.price;
      return total + (price * item.quantity);
    }, 0);

    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    return {
      items,
      subtotal,
      tax,
      total
    };
  }

  addToCart(product: Product, quantity: number = 1) {
    const currentItems = this.cartState().items;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    let newItems: CartItem[];
    if (existingItem) {
      newItems = currentItems.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newItems = [...currentItems, { product, quantity }];
    }

    this.cartState.set(this.calculateTotals(newItems));
    this.saveToLocalStorage();
  }

  removeFromCart(productId: number) {
    const newItems = this.cartState().items.filter(item => item.product.id !== productId);
    this.cartState.set(this.calculateTotals(newItems));
    this.saveToLocalStorage();
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity < 1) return;

    const newItems = this.cartState().items.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    );

    this.cartState.set(this.calculateTotals(newItems));
    this.saveToLocalStorage();
  }

  clearCart() {
    this.cartState.set({
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0
    });
    localStorage.removeItem('cart');
  }

  private saveToLocalStorage() {
    const state = this.cartState();
    localStorage.setItem('cart', JSON.stringify({
      items: state.items,
      subtotal: state.subtotal,
      tax: state.tax,
      total: state.total
    }));
  }

  private loadFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      this.cartState.set(this.calculateTotals(parsedCart.items));
    }
  }

  getCartState() {
    return this.cartState;
  }

  getItemCount = computed(() => {
    return this.cartState().items.reduce((total, item) => total + item.quantity, 0);
  });
}
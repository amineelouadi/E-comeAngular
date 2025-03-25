import { Component, Input, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.type';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  @Input() product!: Product;
  ngOnChanges(changes: SimpleChanges) {
    console.log('Product Rating:', this.product.rating); // Check in the console
  }
  

  constructor(private cartService: CartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
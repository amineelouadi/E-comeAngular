import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.type';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  loading = signal(true);
  product = signal<Product | null>(null);
  currentImageIndex = 0;

  selectedImage = computed(() => {
    const prod = this.product();
    if (!prod) return '';
    return prod.images[this.currentImageIndex] || prod.imageUrl;
  });

  specs = computed(() => {
    return Object.entries(this.product()?.specs || {});
  });

  constructor() {
    this.route.params.subscribe(params => {
      const id = parseInt(params['id'], 10);
      this.loadProduct(id);
    });
  }

  async loadProduct(id: number) {
    this.loading.set(true);
    const product = await this.productService.getProductById(id);
    this.product.set(product);
    this.loading.set(false);
  }

  addToCart() {
    if (this.product()) {
      this.cartService.addToCart(this.product()!);
    }
  }
}

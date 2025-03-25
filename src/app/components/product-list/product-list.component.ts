import { Component, computed, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.type';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  private productService = inject(ProductService);
  
  error = signal<string | null>(null);
  loading = signal(true);
  products = signal<Product[]>([]);
  categories = this.productService.getCategories();
  
  selectedCategory = signal('');
  sortBy = signal('name');
  currentPage = signal(1);
  itemsPerPage = 8;

  filteredProducts = computed(() => {
    const products = this.products();
    let filtered = this.selectedCategory() 
      ? products.filter(p => p.category === this.selectedCategory())
      : products;

    // Add sorting
    filtered = [...filtered].sort((a, b) => {
      switch (this.sortBy()) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'priceLow':
          return a.price - b.price;
        case 'priceHigh':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  });

  displayedProducts = computed(() => {
    const filtered = this.filteredProducts();
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return filtered.slice(start, end);
  });

  pages = computed(() => {
    const pageCount = Math.ceil(this.filteredProducts().length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  });

  constructor() {
    console.log('ProductList Component - Fetching products and categories');
    this.loadProducts();
    this.productService.fetchCategories();
  }

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    try {
      this.loading.set(true);
      await this.productService.fetchProducts();
      const products = this.productService.getProducts()();
      this.products.set(products);
      this.error.set(null);
    } catch (err) {
      this.error.set('Failed to load products. Please try again later.');
      console.error('Error loading products:', err);
    } finally {
      this.loading.set(false);
    }
  }

  filterProducts() {
    this.currentPage.set(1);
  }

  sortProducts() {
    this.currentPage.set(1);
  }
}
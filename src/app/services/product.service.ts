import { Injectable, signal } from '@angular/core';
import { Product, Category } from '../models/product.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly products = signal<Product[]>([]);
  private readonly categories = signal<Category[]>([]);
  private readonly loading = signal<boolean>(false);
  private readonly error = signal<string | null>(null);

  async fetchProducts(): Promise<void> {
    try {
      console.log('Starting products fetch...');
      this.loading.set(true);
      this.error.set(null);
      
      const response = await fetch('http://localhost:3000/products');
      console.log('Fetch response:', response);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Products data:', data);
      this.products.set(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      this.error.set('Failed to fetch products. Please check your internet connection and try again.');
    } finally {
      this.loading.set(false);
      console.log('Products fetch completed');
    }
  }

  async fetchCategories(): Promise<void> {
    try {
      console.log('Starting categories fetch...');
      this.loading.set(true);
      this.error.set(null);
      
      const response = await fetch('http://localhost:3000/categories');
      console.log('Fetch response:', response);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Categories data:', data);
      this.categories.set(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      this.error.set('Failed to fetch categories. Please check your internet connection and try again.');
    } finally {
      this.loading.set(false);
      console.log('Categories fetch completed');
    }
  }

  async getProductById(id: number): Promise<Product | null> {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`);
      return await response.json();
    } catch (err) {
      this.error.set('Failed to fetch product');
      console.error('Error fetching product:', err);
      return null;
    }
  }

  getProducts() {
    return this.products;
  }

  getCategories() {
    return this.categories;
  }

  getLoading() {
    return this.loading;
  }

  getError() {
    return this.error;
  }
}
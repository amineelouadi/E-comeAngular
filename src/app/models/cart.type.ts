import { Product } from './product.type';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}
import { Injectable } from '@angular/core';
import { Order } from '../models/order.type';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...order,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      });
      return await response.json();
    } catch (err) {
      console.error('Error creating order:', err);
      throw new Error('Failed to create order');
    }
  }

  async getOrderById(id: number): Promise<Order> {
    try {
      const response = await fetch(`http://localhost:3000/orders/${id}`);
      return await response.json();
    } catch (err) {
      console.error('Error fetching order:', err);
      throw new Error('Failed to fetch order');
    }
  }
}
import { Component, computed, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Order, OrderItem, PaymentMethod } from '../../models/order.type';
import { CartState, CartItem } from '../../models/cart.type';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  private cartState = this.cartService.getCartState();
  
  protected cartItems = computed(() => this.cartState().items);
  protected cartSubtotal = computed(() => this.cartState().subtotal);
  protected cartTax = computed(() => this.cartState().tax);
  protected cartTotal = computed(() => this.cartState().total);
  processing = false;

  checkoutForm: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    streetAddress: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required],
    country: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
    expirationDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
  });

  async placeOrder() {
  if (this.checkoutForm.valid && !this.processing) {
    this.processing = true;
    
    try {
      const formValue = this.checkoutForm.value;
      
      const order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'> = {
        items: this.cartItems().map((item: CartItem) => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          unitPrice: item.product.discountPrice || item.product.price,
          subtotal: (item.product.discountPrice || item.product.price) * item.quantity
        })),
        shippingAddress: {
          fullName: formValue.fullName,
          streetAddress: formValue.streetAddress,
          city: formValue.city,
          state: formValue.state,
          zipCode: formValue.zipCode,
          country: formValue.country,
          phoneNumber: formValue.phoneNumber
        },
        billingAddress: {
          fullName: formValue.fullName,
          streetAddress: formValue.streetAddress,
          city: formValue.city,
          state: formValue.state,
          zipCode: formValue.zipCode,
          country: formValue.country,
          phoneNumber: formValue.phoneNumber
        },
        paymentMethod: {
          type: 'creditCard',
          cardNumber: formValue.cardNumber,
          expirationDate: formValue.expirationDate,
          cvv: formValue.cvv
        },
        subtotal: this.cartSubtotal(),
        shippingCost: 0,
        tax: this.cartTax(),
        total: this.cartTotal(),
        status: 'pending'
      };

      // Create the order using OrderService
      await this.orderService.createOrder(order);

      // Clear the cart after the order is placed
      this.cartService.clearCart();

      // Show confirmation popup using SweetAlert2
      await Swal.fire({
        icon: 'success',
        title: 'Order Placed Successfully!',
        text: 'Thank you for shopping with us. Your order is being processed.',
        confirmButtonText: 'Continue shoping'
      });

      // Redirect to the "Thank You" page (payment success page)
      await this.router.navigate(['/thank-you'], { state: { fromCheckout: true } });

    } catch (error) {
      console.error('Error placing order:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.',
      });
    } finally {
      this.processing = false;
    }
  }
}

}
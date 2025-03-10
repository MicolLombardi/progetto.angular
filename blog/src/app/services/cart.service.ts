import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { product: Product, quantity: number }[] = [];
  private cartSubject = new BehaviorSubject<{ product: Product, quantity: number }[]>(this.cartItems);
  cart$ = this.cartSubject.asObservable(); // Observable per ascoltare i cambiamenti del carrello

  constructor() {}

  addToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.updateCart();
  }

  removeFromCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        this.cartItems = this.cartItems.filter(item => item.product.id !== product.id);
      }
    }
    this.updateCart();
  }

  // Restituisce la quantità di un prodotto nel carrello
  getProductQuantity(productId: number): number {
    const item = this.cartItems.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }

  // Funzione per cancellare il carrello
  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  private updateCart() {
    this.cartSubject.next(this.cartItems); // Notifica i cambiamenti al comportamento del carrello
  }
}

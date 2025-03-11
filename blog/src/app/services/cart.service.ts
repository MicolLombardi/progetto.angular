import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { product: Product, quantity: number }[] = [];

  // BehaviorSubject per monitorare lo stato del carrello
  private cartSubject = new BehaviorSubject<{ product: Product, quantity: number }[]>(this.loadCart());
  cart$ = this.cartSubject.asObservable(); // Observable per ascoltare i cambiamenti del carrello

  constructor() {}

  // Carica il carrello dal localStorage se presente
  private loadCart(): { product: Product, quantity: number }[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  // Aggiungi un prodotto al carrello
  addToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.updateCart(); // Aggiorna il carrello e salva in localStorage
  }

  // Ottieni tutti gli articoli del carrello
  getCartItems(): { product: Product, quantity: number }[] {
    return this.cartItems;
  }

  // Rimuovi un prodotto dal carrello
  removeFromCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        this.cartItems = this.cartItems.filter(item => item.product.id !== product.id);
      }
    }
    this.updateCart(); // Aggiorna il carrello e salva in localStorage
  }

  // Restituisce la quantità di un prodotto nel carrello
  getProductQuantity(productId: number): number {
    const item = this.cartItems.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }

  // Pulisci il carrello
  clearCart() {
    this.cartItems = [];
    this.updateCart(); // Aggiorna il carrello e salva in localStorage
  }

  // Funzione per salvare il carrello su localStorage
  private updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems)); // Salva il carrello in localStorage
    this.cartSubject.next(this.cartItems); // Notifica i cambiamenti al comportamento del carrello
  }
}

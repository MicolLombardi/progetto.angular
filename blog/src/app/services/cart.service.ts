import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { product: Product, quantity: number }[] = this.loadCartFromLocalStorage();
  private cartSubject = new BehaviorSubject(this.cartItems);
  cart$ = this.cartSubject.asObservable(); // Osservabile per aggiornare la UI

  constructor() {}

  // 📌 Funzione per CARICARE il carrello dal localStorage
  private loadCartFromLocalStorage(): { product: Product, quantity: number }[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  // 📌 Funzione per SALVARE il carrello nel localStorage
  private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  // 📌 Funzione per aggiungere un prodotto al carrello
  addToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.updateCart();
  }

  // 📌 Funzione per rimuovere un prodotto dal carrello (uno alla volta)
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

  // 📌 Funzione per ottenere la quantità di un prodotto
  getProductQuantity(productId: number): number {
    const item = this.cartItems.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }

  // 📌 Funzione per svuotare il carrello
  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  // 📌 Funzione per aggiornare il carrello e salvare i dati
  private updateCart() {
    this.cartSubject.next(this.cartItems);
    this.saveCartToLocalStorage(); // 🔥 Salva il carrello nel localStorage
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: { product: Product; quantity: number }[] = [];
  private cartSubject = new BehaviorSubject<{ product: Product; quantity: number }[]>([]);

  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  addToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1; // Se l'oggetto esiste, aumenta la quantità
    } else {
      this.cartItems.push({ product, quantity: 1 }); // Altrimenti, aggiungi il prodotto con quantità 1
    }
    
    this.updateCart();
  }

  removeOneFromCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1; // Riduci la quantità se maggiore di 1
      } else {
        this.removeFromCart(product); // Rimuovi il prodotto completamente se la quantità è 1
      }
    }

    this.updateCart();
  }

  removeFromCart(product: Product) {
    const index = this.cartItems.findIndex(item => item.product.id === product.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1); // Rimuove solo il prodotto
      this.updateCart();
    }
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  private updateCart() {
    this.cartSubject.next([...this.cartItems]); // Notifica agli osservatori che il carrello è stato aggiornato
    localStorage.setItem('cart', JSON.stringify(this.cartItems)); // Salva lo stato del carrello nel localStorage
  }

  private loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next(this.cartItems); // Invia il carrello salvato agli osservatori
    }
  }
}

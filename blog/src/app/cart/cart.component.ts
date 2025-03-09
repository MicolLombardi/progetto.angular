import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: false,  
})
export class CartComponent implements OnInit {
  cartItems: { product: Product, quantity: number }[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cartItems => {
      this.cartItems = cartItems;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product); // Aggiungi il prodotto al carrello
  }

  removeOneFromCart(product: Product) {
    this.cartService.removeOneFromCart(product); // Riduci la quantità del prodotto
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product); // Rimuovi il prodotto dal carrello
  }

  clearCart() {
    this.cartService.clearCart(); // Svuota tutto il carrello
  }

  increaseQuantity(product: Product) {
    this.cartService.addToCart(product); // Aumenta la quantità del prodotto
  }

  decreaseQuantity(product: Product) {
    this.cartService.removeOneFromCart(product); // Diminuisci la quantità del prodotto
  }
}

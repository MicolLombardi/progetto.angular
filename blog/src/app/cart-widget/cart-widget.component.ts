import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-cart-widget',
  templateUrl: './cart-widget.component.html',
  styleUrls: ['./cart-widget.component.css'],
  standalone: false,  
})
export class CartWidgetComponent implements OnInit {
  cartItems: { product: Product, quantity: number }[] = [];
  latestProducts: { product: Product, quantity: number }[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Ascolta i cambiamenti del carrello
    this.cartService.cart$.subscribe((cartItems) => {
      this.cartItems = cartItems;
      // Prendi gli ultimi 3 prodotti aggiunti al carrello
      this.latestProducts = this.cartItems.slice(-3); // Prende gli ultimi 3 prodotti
    });
  }
}

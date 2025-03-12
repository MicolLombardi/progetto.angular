import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: false,
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  quantities: { [key: number]: number } = {}; 
  showCartWidget = false;
  totalItemsInCart = 0;
  lastAddedProducts: Product[] = []; // 🔥 Ultimi 3 prodotti aggiunti

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.updateQuantities(); 
    });

    this.cartService.cart$.subscribe(() => {
      this.updateQuantities();
      this.updateCartWidget(); // 🔥 Aggiorna il widget quando il carrello cambia
    });

    this.updateCartWidget(); // 🔥 Carica il numero iniziale di prodotti nel widget
  }

  updateQuantities() {
    this.products.forEach(product => {
      this.quantities[product.id] = this.cartService.getProductQuantity(product.id) || 0;
    });
  }

  increaseQuantity(product: Product) {
    this.cartService.addToCart(product);
    this.updateLastAddedProducts(product); // 🔥 Aggiungi il prodotto alla lista degli ultimi aggiunti
    this.showCart();
  }

  decreaseQuantity(product: Product) {
    this.cartService.removeFromCart(product);
    this.updateCartWidget();
  }

  // 🔥 Mostra il widget e lo nasconde dopo 3 secondi
  showCart() {
    this.showCartWidget = true;
    this.updateCartWidget();
    setTimeout(() => {
      this.showCartWidget = false;
    }, 3000);
  }

  // 🔥 Aggiorna il numero totale di prodotti nel carrello
  updateCartWidget() {
    this.totalItemsInCart = Object.values(this.quantities).reduce((acc, val) => acc + val, 0);
  }

  // 🔥 Aggiorna la lista degli ultimi prodotti aggiunti
  updateLastAddedProducts(product: Product) {
    this.lastAddedProducts = [product, ...this.lastAddedProducts.slice(0, 2)]; // Mantiene solo gli ultimi 3
  }
}



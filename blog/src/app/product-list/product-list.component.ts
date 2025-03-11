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
  quantities: { [key: number]: number } = {}; // Memorizza le quantità per ogni prodotto
  showCartWidget = false;

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit() {
    // Sottoscrizione ai prodotti dal ProductService
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.updateQuantities(); // Carica le quantità iniziali dal carrello
    });

    // Sottoscrizione agli aggiornamenti del carrello per mantenere aggiornate le quantità
    this.cartService.cart$.subscribe(() => {
      this.updateQuantities(); // Ricalcola le quantità ogni volta che il carrello cambia
    });
  }

  // Funzione per aggiornare le quantità in base agli articoli nel carrello
  updateQuantities() {
    this.products.forEach(product => {
      // Ottieni la quantità di ciascun prodotto dal carrello
      this.quantities[product.id] = this.cartService.getProductQuantity(product.id);
    });
  }

  increaseQuantity(product: Product) {
    // Aggiungi il prodotto al carrello
    this.cartService.addToCart(product);
  }

  decreaseQuantity(product: Product) {
    // Rimuovi il prodotto dal carrello
    this.cartService.removeFromCart(product);
  }

  addToCart(product: Product) {
    // Aggiungi il prodotto al carrello
    this.cartService.addToCart(product);
    this.showCartWidget = true;

    // Nasconde il widget dopo 3 secondi
    setTimeout(() => {
      this.showCartWidget = false;
    }, 3000);  // 3 secondi
  }
}

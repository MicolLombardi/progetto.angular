import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

import { ProductService } from '../services/product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: false,  
})
  export class ProductListComponent implements OnInit {
    products: Product[] = [];
    productQuantities: { [productId: number]: number } = {};
  
    constructor(private cartService: CartService, private productService: ProductService) {}
  
    ngOnInit() {
      this.productService.getProducts().subscribe(products => {
        this.products = products;
      });
  
      this.cartService.cart$.subscribe(cartItems => {
        this.productQuantities = {}; 
        cartItems.forEach(item => {
          this.productQuantities[item.product.id] = item.quantity;
        });
      });
    }
  
    addToCart(product: Product) {
      this.cartService.addToCart(product);
    }
  
    removeFromCart(product: Product) {
      this.cartService.removeFromCart(product);
    }
  
    getProductQuantity(product: Product): number {
      return this.productQuantities[product.id] || 0;
    }
}

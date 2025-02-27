import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

 
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}
@Injectable({
  providedIn: 'root'
})
  export class ProductService {
    private products: Product[] = [
      { id: 1, name: 'Tarocchi Marsigliesi', description: 'Set completo di carte', price: 25, image: 'assets/tarocchi1.jpg' },
      { id: 2, name: 'Tarocchi Rider-Waite', description: 'Classico mazzo', price: 30, image: 'assets/tarocchi2.jpg' },
      { id: 3, name: 'Tarocchi Egiziani', description: 'Edizione speciale', price: 40, image: 'assets/tarocchi3.jpg' }
    ];
  
    getProducts(): Observable<Product[]> {
      return of(this.products);
    }
  }


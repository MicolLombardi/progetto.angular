import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../product';


@Injectable({
  providedIn: 'root'
})
  export class ProductService {
    private products: Product[] = [
      { id: 1, name: "Tarocchi Rider-Waite", description: "Il mazzo classico per ogni lettura", price: 25.99 },
      { id: 2, name: "Tarocchi Marsigliesi", description: "Uno stile antico e affascinante", price: 29.99 },
      { id: 3, name: "Tarocchi delle Streghe", description: "Mazzo ideale per pratiche esoteriche", price: 34.99 },
      { id: 4, name: "Tarocchi degli Angeli", description: "Un mazzo con energia positiva", price: 27.50 },
      { id: 5, name: "Libro: Guida ai Tarocchi", description: "Interpretazione e simbolismo approfonditi", price: 18.99 },
      { id: 6, name: "Incenso Purificatore", description: "Ideale per sessioni di lettura", price: 9.99 },
      { id: 7, name: "Tappetino Esoterico", description: "Perfetto per stendere i tarocchi", price: 19.99 },
      { id: 8, name: "Cristallo di Ametista", description: "Per aumentare l'intuizione", price: 14.50 },
      { id: 9, name: "Diario delle Letture", description: "Annota i tuoi consulti", price: 12.99 },
      { id: 10, name: "Pendolo Divinatorio", description: "Strumento di divinazione e guida", price: 21.00 }
    ];
  
    getProducts(): Observable<Product[]> {
      return of(this.products);
    }
  }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
import { switchMap, map } from 'rxjs/operators';
import { Users } from '../users';

@Component({
  selector: 'app-summary',
  standalone: false,
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  userData: any;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const userId = Number(params.get('id')); // Converti in numero
          return this.usersService.getUserById(userId);
        }),
        map((data: Users) => ({
          fullName: data.name,           // Nome  
          userHandle: data.username,     // Username
          contactEmail: data.email,      // Email
          streetName: data.address.street, // Indirizzo
          apartment: data.address.suite,  // Suite
          town: data.address.city,        // Città
          postalCode: data.address.zipcode, // CAP
        }))
      )
      .subscribe({
        next: (mappedData) => {
          this.userData = mappedData; 
        },
        error: (err) => {
          console.error('Errore durante il caricamento dei dati:', err);
        },
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Users } from '../users';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: false,
})
export class UsersComponent implements OnInit {
  users: Users[] = [];

  isAdmin: boolean = false;

  constructor(private usersService: UsersService, private authService: AuthService) {}

  ngOnInit(): void {
    // Recupera la lista utenti
    this.usersService.getUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Errore durante il caricamento degli utenti:', err),
    });

    this.authService.getLoggedInUser().subscribe(user => {
      this.isAdmin = user?.role === 'admin';
  })
}}

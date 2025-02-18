import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: false,
  styleUrls: ['./register.component.css'],
  
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  role: string = 'member'; // Default ruolo

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.username, this.password, this.role).subscribe({
      next: () => {
        this.router.navigate(['/login']); // Dopo la registrazione, rimandiamo alla pagina di login
      },
      error: (err) => {
        this.errorMessage = err.message; // Mostriamo l'errore se l'utente esiste già
      },
    });
  }
}

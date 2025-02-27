import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: false, 
})
export class ContactComponent {
  contactForm: FormGroup;

  @Output() messageSent = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      messaggio: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Dati inviati:', this.contactForm.value);

      this.contactService.sendMessage(this.contactForm.value).subscribe({
        next: () => {
          console.log('Messaggio inviato con successo!');
          this.messageSent.emit(this.contactForm.value); // Invia i dati ad AboutComponent
          this.contactForm.reset();
        },
        error: (err) => {
          console.error('Errore durante l’invio:', err);
        }
      });
    }
  }
}

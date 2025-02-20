import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: false,
})
export class ContactComponent {
  contactForm: FormGroup;

  @ViewChild('modal') modal!: ModalComponent;

  constructor(private fb: FormBuilder, private contactService: ContactService, private router: Router) {
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
          this.modal.openModal();
          this.contactForm.reset();
        },
        error: (err) => {
          console.error('Errore durante l’invio:', err);
        }
      });
    }
  }

  onModalClosed() {
    this.router.navigate(['/riepilogo'], { state: { data: this.contactForm.value } });
  }
}

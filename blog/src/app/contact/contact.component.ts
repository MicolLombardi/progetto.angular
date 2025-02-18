import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: false,
})
export class ContactComponent implements AfterViewInit {
  contactForm: FormGroup;

  @ViewChild(ModalComponent) modal!: ModalComponent;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      messaggio: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    // Controlla che la modale sia disponibile dopo la visualizzazione
    if (!this.modal) {
      console.error('ModalComponent non è stato trovato nel template!');
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Dati inviati:', this.contactForm.value);

      this.contactService.sendMessage(this.contactForm.value).subscribe({
        next: (response) => {
          console.log('Messaggio inviato con successo!', response);
          
          // Assicura che la modale sia pronta prima di aprirla
          if (this.modal) {
            this.modal.message = 'Messaggio inviato con successo!';
            setTimeout(() => this.modal.openModal(), 0);
          }

          this.contactForm.reset();
        },
        error: (err) => {
          console.error('Errore durante l’invio:', err);

          if (this.modal) {
            this.modal.message = 'Errore durante l’invio del messaggio. Riprova più tardi.';
            setTimeout(() => this.modal.openModal(), 0);
          }
        }
      });
    } else {
      console.log('Il form non è valido');
    }
  }
}

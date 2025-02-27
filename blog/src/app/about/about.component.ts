import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: false,
})
export class AboutComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  contactForm: any = null;


  team = [
    { name: 'Giulia Rossi', role: 'Esperta di Tarocchi', description: 'Con oltre 10 anni di esperienza...' },
    { name: 'Marco Bianchi', role: 'Astrologo e Cartomante', description: 'Specializzato nell’astrologia...' },
    { name: 'Elena Verdi', role: 'Autrice e Ricercatrice', description: 'Elena scrive articoli approfonditi...' }
  ];

  openModal() {
    this.modal.openModal();
  }

  handleFormSubmit(event: any) {
    this.contactForm = event;
    this.modal.closeModal();
  }
}

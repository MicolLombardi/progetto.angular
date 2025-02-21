import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-about',
  standalone: false,
  
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  showSummary: boolean = false;
  ngOnInit(): void {
   
  }
  team = [
    {
      name: 'Giulia Rossi',
      role: 'Esperta di Tarocchi',
      description: 'Con oltre 10 anni di esperienza nella lettura dei tarocchi, Giulia aiuta le persone a trovare chiarezza e guida.',
     
    },
    {
      name: 'Marco Bianchi',
      role: 'Astrologo e Cartomante',
      description: 'Specializzato nell’astrologia e nell’interpretazione simbolica, Marco collega i tarocchi alle influenze cosmiche.',
    
    },
    {
      name: 'Elena Verdi',
      role: 'Autrice e Ricercatrice',
      description: 'Elena scrive articoli approfonditi sui tarocchi, esplorandone la storia e il significato culturale.',
  
    },
  ];

  openModal() {
    this.modal.openModal();
    this.showSummary = false; // Nasconde il riepilogo quando si riapre la modale
  }

  onModalClose() {
    this.showSummary = true; // Mostra il riepilogo dopo la chiusura della modale
  }}

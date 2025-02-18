import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
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
  ];}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-riepilogo',
  templateUrl: './riepilogo.component.html',
  styleUrls: ['./riepilogo.component.css'],
  standalone: false,
 
})
export class RiepilogoComponent {
  datiInviati: any;

  constructor(private router: Router) {
    this.datiInviati = this.router.getCurrentNavigation()?.extras.state?.['data'] || {};
  }
}

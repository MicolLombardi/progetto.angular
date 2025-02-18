import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiscoverService } from '../services/discover.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css'],
  standalone: false,
})
export class DiscoverComponent {
  zodiacForm: FormGroup;
  zodiacSign: string | null = null;
  tarotCard: string | null = null;

  constructor(private fb: FormBuilder, private discoverService: DiscoverService) {  
    this.zodiacForm = this.fb.group({
      dob: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.zodiacForm.valid) {
      const dob = new Date(this.zodiacForm.value.dob);
      this.zodiacSign = this.discoverService.getZodiacSign(dob);
      this.tarotCard = this.discoverService.getTarotCardForZodiacSign(dob);

      console.log(`Segno zodiacale: ${this.zodiacSign}`);
      console.log(`Carta dei tarocchi: ${this.tarotCard}`);
    }
  }
}

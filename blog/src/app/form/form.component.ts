import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { map } from 'rxjs/operators';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  standalone: false,
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  isEditMode: boolean = false;
  formId!: number;
  modalMessage: string = '';

  @ViewChild(ModalComponent) modal!: ModalComponent;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.route.params.subscribe((params) => {
      this.formId = +params['id'];
      this.isEditMode = !!this.formId;
      if (this.isEditMode) {
        this.loadFormData();
      }
    });
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      street: ['', Validators.required],
      suite: [''],
      city: [''],
      zipcode: [''],
    });
  }

  loadFormData(): void {
    this.usersService
      .getUserById(this.formId)
      .pipe(
        map((data) => ({
          name: data.name,
          username: data.username,
          email: data.email,
          street: data.address?.street || '',
          suite: data.address?.suite || '',
          city: data.address?.city || '',
          zipcode: data.address?.zipcode || '',
        }))
      )
      .subscribe({
        next: (mappedData) => {
          this.form.patchValue(mappedData);
        },
        error: (err) =>
          console.error('Errore durante il caricamento dei dati:', err),
      });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;

      if (this.isEditMode) {
        this.usersService.updateUser(this.formId, formData).subscribe({
          next: () => {
            this.modalMessage = 'Dati aggiornati con successo!';
            this.modal.openModal();
            this.router.navigate([`/summary/${this.formId}`]);
          
          },
          error: (err) => {
            console.error("Errore durante l'aggiornamento:", err);
            this.modalMessage = 'Errore durante l’aggiornamento. Riprova.';
            this.modal.openModal();
    
          },
        });
      } else {
        this.usersService.createUser(formData).subscribe({
          next: () => {
            this.modalMessage = 'Dati salvati con successo!';
            this.modal.openModal();
            
          },
          error: (err) => {
            console.error('Errore durante la creazione:', err);
            this.modalMessage = 'Errore durante la creazione. Riprova.';
            this.modal.openModal();
           
          },
        });
      }
    } else {
      this.form.markAllAsTouched();
      this.modalMessage = 'Il form contiene errori. Controlla i campi e riprova.';
      this.modal.openModal();
    
    }
  }

  onCancel(): void {
    if (this.isEditMode) {
      this.router.navigate([`/form/${this.formId}`]); 
    } else {
      this.router.navigate(['/users']); 
    }
  }
}

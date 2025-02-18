import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ThemeService } from '../services/theme.service';
import { ModalComponent } from '../shared/modal/modal.component';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
  standalone: false,
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  isDarkMode: boolean = false;
  modalMessage: string = '';

  @ViewChild(ModalComponent) modal!: ModalComponent;
 

  constructor(private fb: FormBuilder, private themeService: ThemeService) {}

  ngOnInit() {
    this.categoryForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categories: this.fb.array([]),
    });
  }

  get categories(): FormArray {
    return this.categoryForm.get('categories') as FormArray;
  }

  addCategory() {
    this.categories.push(
      this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: [0, [Validators.required, Validators.min(0)]],
      })
    );
  }

  removeCategory(index: number) {
    this.categories.removeAt(index);
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      console.log(this.categoryForm.value);
      this.modalMessage = 'Form inviato con successo!';
      this.modal.openModal();
      this.categoryForm.reset();
    } else {
      this.modalMessage = 'Errore durante l’aggiornamento. Riprova.';
      this.modal.openModal();

    }
  }
}

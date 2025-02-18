import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form.component';
import { ModalModule } from "../shared/modal/modal.module";



const routes: Routes = [
  { path: '', component: FormComponent }, 
  { path: ':id', component: FormComponent }, 
];


@NgModule({
  declarations: [FormComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes), HttpClientModule, ModalModule],
})
export class FormModule {}

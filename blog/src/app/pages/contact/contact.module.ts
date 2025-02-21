import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from '../../contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from "../../shared/modal/modal.module";



@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    ModalModule
],
exports: [ContactComponent]
})
export class ContactModule { }

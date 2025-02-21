import { AboutComponent } from './../../about/about.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { ModalModule } from "../../shared/modal/modal.module";
import { ContactModule } from '../contact/contact.module';




@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    ModalModule,
    ContactModule
]
})
export class AboutModule { }

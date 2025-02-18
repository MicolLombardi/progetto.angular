import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: false,
})
export class ModalComponent {
  @Input() message: string = 'Operazione completata!';
  @ViewChild('content') content!: TemplateRef<any>
  
  private modalRef: NgbModalRef | null = null;
  constructor(private modalService: NgbModal) {}

  openModal() {
    if (!this.modalRef) {
      this.modalRef = this.modalService.open(this.content, { centered: true });
    }
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = null; 
    }
  }
}

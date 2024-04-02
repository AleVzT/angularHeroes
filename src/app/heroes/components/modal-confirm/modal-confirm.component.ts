import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'page-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.css'
})
export class ModalConfirmComponent {
  @Output() confirmado: EventEmitter<boolean> = new EventEmitter<boolean>();

  confirmarEliminacion() {
    this.confirmado.emit(true);
  }

  cancelarEliminacion() {
    this.confirmado.emit(false);
  }
}

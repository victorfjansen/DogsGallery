import { Component } from '@angular/core';

@Component({
  selector: 'modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  visible: boolean;

  constructor() {
    this.visible = false;
  }

  toggleVisibility(): void {
    this.visible = !this.visible;
  }
}

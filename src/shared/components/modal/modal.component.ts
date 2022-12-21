import { transition, trigger, useAnimation } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { fadeSlideIn } from 'src/shared/animations';

//aprensenta componente com o método de OnPush
@Component({
  selector: 'modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [transition('void => *', useAnimation(fadeSlideIn))]),
  ],
})
export class ModalComponent {
  visible: boolean;

  //define a visibilidade dele como false
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.visible = false;
  }

  // seta a visibilidade dele como true or false dependendo da anterior e renderiza o componente na DOM
  toggleVisibility(): void {
    this.visible = !this.visible;
    this.changeDetectorRef.detectChanges();
  }
}

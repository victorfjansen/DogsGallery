import { transition, trigger, useAnimation } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { fadeSlideIn } from 'src/shared/animations';

@Component({
  selector: 'modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  visible: boolean;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.visible = false;
  }

  toggleVisibility(): void {
    this.visible = !this.visible;
    this.changeDetectorRef.detectChanges();
  }
}

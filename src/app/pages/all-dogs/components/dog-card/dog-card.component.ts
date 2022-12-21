import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { DogViewModel } from 'src/shared/models';

import { DogModalTemplateComponent } from '../dog-modal-template/dog-modal-template.component';

@Component({
  selector: 'dog-card-component',
  templateUrl: './dog-card.component.html',
  styleUrls: ['./dog-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogCardComponent {
  @ViewChild('modal') modal: DogModalTemplateComponent | undefined;
  @Input() dogObject: DogViewModel;

  constructor() {
    this.dogObject = {
      imageUrl: '',
      lifeSpan: '',
      name: '',
      origin: '',
      temperament: '',
    };
  }

  handleOpenModal(): void {
    this.modal?.toggleVisibility(this.dogObject);
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DogViewModel } from 'src/shared/models';

@Component({
  selector: 'dog-card-component',
  templateUrl: './dog-card.component.html',
  styleUrls: ['./dog-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogCardComponent {
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
}

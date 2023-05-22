import { DogViewModel } from '../../models/dog.model';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'snackbar-component',
  templateUrl: './snakcbar.component.html',
  styleUrls: ['./snakcbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnakcbarComponent {
  @Output() clickEvent: EventEmitter<void>;

  @Input() dog: DogViewModel;
  @Input() withFavButton: boolean;

  constructor() {
    this.clickEvent = new EventEmitter();
    this.dog = {
      imageUrl: '',
      lifeSpan: '',
      name: '',
      origin: '',
      temperament: '',
    };

    this.withFavButton = false;
  }
}
